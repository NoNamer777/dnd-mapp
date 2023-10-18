import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DmaRootComponent, DmaRootModule } from './components';

@NgModule({
    imports: [BrowserModule, DmaRootModule],
    bootstrap: [DmaRootComponent],
})
export class AppModule {}
