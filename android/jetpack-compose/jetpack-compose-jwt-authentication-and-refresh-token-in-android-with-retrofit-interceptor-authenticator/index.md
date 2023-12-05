---
title: "Android Compose开发：Retrofit如何实现JWT授权认证和自动刷新Token功能？OkHttp3中Interceptor和Authenticator使用实例"
date: "2023-09-09"
categories: 
  - "Android开发"
tags: 
  - "Android Compose开发"
  - "Android开发常见问题"
---

之前写的《[NestJS中如何进行鉴权和授权验证？JWT、Passport](https://www.seozen.top/nestjs-auth-with-passport.html)》这篇文章，介绍了在NestJS端如何实现JWT授权验证，下面介绍下，如何在Android端，利用Retrofit和OkHttp3来实现接口认证和Token自动刷新的功能。

## Interceptor

在Android端，我们请求后端接口一般是以下代码：
```kotlin
    @POST("auth/current-user")
    suspend fun getCurrentUser(
        @Header("authorization") token: String,
    ): Response<SuccessResponse<AuthResponse>>
```
如果每个接口都这么写，那就有很多重复的`header`代码，我们可以利用okhttp提供的`Interceptor`来实现默认添加授权header信息的功能：
```kotlin
class AuthInterceptor @Inject constructor() : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = runBlocking {
            UserInfoHelper.getAccessToken().first()
        }

        val request = chain.request()
        if (!token.isNullOrEmpty()) {

            val newRequest = request
                .newBuilder()
                .header("Authorization", "Bearer $token")
                .build()
            return chain.proceed(newRequest)
        }
        return chain.proceed(request)
    }
}
```
上面的逻辑也很简单，就是有Token的时候给当前的request加一个header，没有就继续forward。

## Authenticator

当`AccessToken`过期的时候，接口会返回401代码，但是这时候我们一般还有`RefreshToken`，这个时长要比普通的Token长的多，我们只要通过这个向后台请求新的AccessToken就可以，我们可以利用OkHttp中的`Authenticator`来实现这个功能：
```kotlin
class AuthAuthenticator @Inject constructor() : Authenticator {
    override fun authenticate(route: Route?, response: Response): Request? {

        if (response.code == 401 ) {

            val refreshToken = runBlocking {
                UserInfoHelper.getRefreshToken().first()
            }
            if (refreshToken.isNullOrEmpty()) return null

            val oldAccessToken = runBlocking {
                UserInfoHelper.getAccessToken().first()
            }
            if (oldAccessToken.isNullOrEmpty()) return null

            synchronized(this) {
                return runBlocking {

                    // 如果多个线程同时401，都会retry的情况下，要判断两次获取的AccessToken是否相同，
                    // 如果不同，表示已经有其他线程完成刷新AccessToken的工作，就不需要再刷新
                    val newAccessToken = UserInfoHelper.getAccessToken().first()
                    if(newAccessToken != oldAccessToken) return@runBlocking null

                    val newToken = getNewToken(refreshToken)

                    if (!newToken.isSuccessful || newToken.body() == null) { 
                        // 注意这里要移除AccessToken和RefreshToken，不然可能会导致首次登录密码错误返回401，重复发刷新Token的情况
                        UserInfoHelper.deleteToken()
                        UserInfoDataStore.isSignedIn.set(false)
                    }

                    newToken.body()?.let {
                        UserInfoHelper.setAccessToken(it.data.accessToken)
                        response.request.newBuilder()
                            .header("Authorization", "Bearer ${it.data.accessToken}")
                            .build()
                    }
                }
            }
        }
        return null
    }

    private suspend fun getNewToken(refreshToken: String): retrofit2.Response<SuccessResponse<AuthResponse>> {

        val baseUrl = runBlocking {
            ConfigHelper.getBaseUrl().first()
        }
        
        val service = Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(AuthService::class.java)

        return service.refreshToken(refreshToken)
    }
}
```
上面首先判断是否是401的情况，不过正常也只有401的情况才会激活Authenticator，这里要是觉得多余可以去掉，只是保险起见，下面判断了两种Token是否都有值，如果是第一次登录，大多数情况应该都是空的，就没必要重复请求，上面需要注意的地方都有注释，有什么不懂的留言评论就好，之后把上面的代码注入到Retrofit中就行。

## Retrofit注入OkHttp依赖
```kotlin
@InstallIn(SingletonComponent::class)
@Module
object NetworkModule {

    @Singleton
    @Provides
    fun provideAuthInterceptor(): AuthInterceptor = AuthInterceptor()

    @Singleton
    @Provides
    fun provideAuthAuthenticator(): AuthAuthenticator = AuthAuthenticator()

    @Singleton
    @Provides
    fun provideOkHttpClient(
        authInterceptor: AuthInterceptor,
        authAuthenticator: AuthAuthenticator,
    ): OkHttpClient {
        val loggingInterceptor = HttpLoggingInterceptor()
        loggingInterceptor.level = HttpLoggingInterceptor.Level.BODY

        val simpleLogInterceptor = HttpInterceptSimpleLog(printRequestInfo = false)
        return OkHttpClient.Builder()
            .authenticator(authAuthenticator)
            .addInterceptor(authInterceptor)
            .addInterceptor(simpleLogInterceptor)
            .addInterceptor(loggingInterceptor)
            .build()
    }

    @Singleton
    @Provides
    fun provideRetrofitBuilder(): Retrofit.Builder {

        val baseUrl = runBlocking {
            ConfigHelper.getBaseUrl().first()
        }
        return Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
    }

    @Singleton
    @Provides
    fun provideAuthService(okHttpClient: OkHttpClient, retrofit: Retrofit.Builder): AuthService =
        retrofit
            .client(okHttpClient)
            .build()
            .create(AuthService::class.java)

}
```
参考资料：

[https://www.javadoc.io/static/com.squareup.okhttp3/okhttp/3.11.0/okhttp3/Authenticator.html](https://www.javadoc.io/static/com.squareup.okhttp3/okhttp/3.11.0/okhttp3/Authenticator.html)

[https://proandroiddev.com/jwt-authentication-and-refresh-token-in-android-with-retrofit-interceptor-authenticator-da021f7f7534](https://proandroiddev.com/jwt-authentication-and-refresh-token-in-android-with-retrofit-interceptor-authenticator-da021f7f7534)
