import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { DmaHttpRequestModule } from '../../../app/shared';

@NgModule({
    imports: [DmaHttpRequestModule.withInterceptors([]), HttpClientTestingModule],
    exports: [DmaHttpRequestModule, HttpClientTestingModule],
})
export class DmaHttpRequestTestingModule {}
