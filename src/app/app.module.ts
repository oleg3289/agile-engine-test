import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routing';
import { PictureViewerModule } from './components/picture-viewer/picture-viewer.module';
import { AboutGuard } from './guards/auth.guard';
import { ImagesResolver } from './resolvers/images.resolver';
import { AppStorageService } from './services/appStorage.service';
import { GetService } from './services/get.service';
import { ImageDetailsResolver } from './resolvers/imageDetails.resolver';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LightBoxModule, WavesModule } from 'ng-uikit-pro-standard';
import { MDBBootstrapModule, IconsModule } from 'angular-bootstrap-md';

@NgModule({
    imports:      [ 
        BrowserModule, 
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(APP_ROUTING),
        HttpClientModule,
        MatDialogModule,
        PictureViewerModule,
        MDBBootstrapModule.forRoot(),
        LightBoxModule,
        WavesModule,
        IconsModule
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
        AppStorageService,
        GetService,
        ImagesResolver,
        AboutGuard,
        ImageDetailsResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ]
})
export class AppModule {}