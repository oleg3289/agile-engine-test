import { Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { AboutGuard } from "./guards/auth.guard";
import { ImageDetailsResolver } from "./resolvers/imageDetails.resolver";
import { ImagesResolver } from "./resolvers/images.resolver";

export const APP_ROUTING: Routes = [
    { path: '', canActivate: [AboutGuard], resolve: {imageData: ImagesResolver}, component: AppComponent, pathMatch: 'full' },
    { path: ':id', resolve: { imageDetails: ImageDetailsResolver }, component: AppComponent },
    // {path: '**', component: NotFoundComponent}
    { 
        path: '**', // bonus: all routes not defined forward to /home
        redirectTo: ''
    }
]