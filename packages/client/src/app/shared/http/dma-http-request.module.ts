import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { authenticationInterceptorProvider } from './interceptors/authentication-interceptor';
import { storeAuthenticationInterceptorProvider } from './interceptors/store-authentication.interceptor';

@NgModule({
    imports: [HttpClientModule],
    providers: [storeAuthenticationInterceptorProvider, authenticationInterceptorProvider],
    exports: [HttpClientModule],
})
export class DmaHttpRequestModule {}
