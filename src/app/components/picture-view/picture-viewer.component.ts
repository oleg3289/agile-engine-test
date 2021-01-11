import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImageDetails } from "src/app/models/imageDetails";

@Component({
    selector: 'app-picture-viewer',
    templateUrl: 'picture-viewer.template.html',
    styleUrls: ['picture-viewer.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PictureViewerComponent implements OnInit {
    public imageDetails: ImageDetails = null;
    public isZoomed: boolean = false;

    @ViewChild('image', {static: false}) private image: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<PictureViewerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ImageDetails,
        private renderer: Renderer2
    ) {
        this.imageDetails = data;
    }

    ngOnInit() {
        console.log(this.imageDetails)
    }

    public onClickBtn(btnName: string) {
        if (btnName == 'rigth') {

        }
    }

    public onClickImg() {

        if (!this.isZoomed) {
            this.renderer.addClass(this.image.nativeElement, 'zoomed')
        }
    }
}