import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent, RootModule } from './components';

@NgModule({
    imports: [BrowserModule, RootModule],
    bootstrap: [RootComponent],
})
export class AppModule {}
