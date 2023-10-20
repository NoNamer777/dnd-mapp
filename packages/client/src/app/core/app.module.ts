import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DmaRootComponent, DmaRootModule } from './components';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, DmaRootModule],
    bootstrap: [DmaRootComponent],
})
export class AppModule {}
