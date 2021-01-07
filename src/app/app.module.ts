import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routing';

@NgModule({
    imports:      [ 
        BrowserModule, 
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(APP_ROUTING),
        HttpClientModule
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: [ ]
})
export class AppModule {}