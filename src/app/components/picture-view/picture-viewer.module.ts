import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PictureViewerComponent } from "./picture-viewer.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
    declarations: [PictureViewerComponent],
    exports: [PictureViewerComponent]
})
export class PictureViewerModule {}