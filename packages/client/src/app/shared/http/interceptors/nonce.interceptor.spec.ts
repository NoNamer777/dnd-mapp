import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DmaHttpRequestTestingModule } from '../../../../testing';
import { DmaHttpRequestService } from '../dma-http-request.service';

describe('NonceInterceptor', () => {
    function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaHttpRequestTestingModule],
            providers: [DmaHttpRequestService],
        });

        return {
            requestService: TestBed.inject(DmaHttpRequestService),
            testController: TestBed.inject(HttpTestingController),
        };
    }
});
