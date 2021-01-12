import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Image } from "src/app/models/image";
import { ImageDetails } from "src/app/models/imageDetails";
import { AppStorageService } from "src/app/services/appStorage.service";

@Component({
    selector: 'app-picture-viewer',
    templateUrl: 'picture-viewer.template.html',
    styleUrls: ['picture-viewer.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PictureViewerComponent implements OnInit {
    public imageDetails: ImageDetails = null;
    public selectedIndex: number = null;
    public isZoomed: boolean = false;
    private zoomIndex: number = 1.2;

    @ViewChild('image', {static: false}) private image: ElementRef;

    get pictures() {
        return this.AS.pictures;
    }

    constructor(
        public dialogRef: MatDialogRef<PictureViewerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {item: ImageDetails, index: number},
        private renderer: Renderer2,
        private AS: AppStorageService,
        private cdRef: ChangeDetectorRef
    ) {
        this.imageDetails = data.item;
        this.selectedIndex = data.index;
    }

    ngOnInit() {
        console.log(this.imageDetails)
    }

    public async onClickBtn(btnName: string) {
        let nextItem: Image = null;

        let isRightBtn: boolean = btnName === 'right';
        let isLeftBtn: boolean = btnName === 'left';

        isRightBtn ? this.selectedIndex += 1 : this.selectedIndex -= 1;

        nextItem = this.pictures.find((i: Image, ind: number) => ind === this.selectedIndex);

        this.renderer.removeClass(this.image.nativeElement, 'faded-in');
        this.renderer.addClass(this.image.nativeElement, 'faded-out');
        setTimeout(() => {
            this.AS.getPicutreById(nextItem.id).subscribe((res) => {
                this.imageDetails = res;
                this.cdRef.detectChanges();
            })
            this.renderer.removeClass(this.image.nativeElement, 'faded-out');
            this.renderer.addClass(this.image.nativeElement, 'faded-in');
        }, 200);
    }

    public zoomToggle() {

        if (!this.isZoomed) {
            this.renderer.addClass(this.image.nativeElement, 'zoomed');

            this.isZoomed = true;
            return;
        }
        if (this.isZoomed) {
            this.renderer.removeClass(this.image.nativeElement, 'zoomed');

            this.isZoomed = false;
            return;
        }
    }
}