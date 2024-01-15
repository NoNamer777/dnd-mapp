import { HttpClientModule } from '@angular/common/http';
import { ClassProvider, NgModule } from '@angular/core';
import { authenticationInterceptorProvider } from './interceptors/authentication.interceptor';
import { storeAuthenticationInterceptorProvider } from './interceptors/store-authentication.interceptor';

const defaultInterceptors = [storeAuthenticationInterceptorProvider, authenticationInterceptorProvider];

@NgModule({
    imports: [HttpClientModule],
    exports: [HttpClientModule],
})
export class DmaHttpRequestModule {
    static withInterceptors(interceptorProviders?: ClassProvider[]) {
        return {
            ngModule: DmaHttpRequestModule,
            providers: [...(interceptorProviders ?? defaultInterceptors)],
        };
    }
}
