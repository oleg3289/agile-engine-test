import {
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureViewerComponent } from './components/picture-view/picture-viewer.component';
import { Image } from './models/image';
import { ImageDetails } from './models/imageDetails';
import { AppStorageService } from './services/appStorage.service';
     
@Component({
    selector: 'app-root',
    templateUrl: 'app.template.html',
    styleUrls: ['app.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
    public index: number = 0;
    
    get pictures() {
        return this.AS.pictures;
    }

    get picturesList() {
        return this.pictures.map((p: Image) => p.cropped_picture);
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private AS: AppStorageService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {}

    public openPictureViewer(item: ImageDetails) {

        this.AS.getPicutreById(item.id).subscribe((res) => {
            const dialogRef = this.dialog.open(PictureViewerComponent, {
                height: 'auto',
                width: 'auto',
                data: res
            });
    
            dialogRef.afterClosed().subscribe(() => {
                this.router.navigate(['/']);
            });
        })
        
    }
}