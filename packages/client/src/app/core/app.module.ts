import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootModule, RootComponent } from './components';

@NgModule({
    imports: [BrowserModule, RootModule],
    bootstrap: [RootComponent],
})
export class AppModule {}
