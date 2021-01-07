import {
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
     
@Component({
    selector: 'app-root',
    templateUrl: 'app.template.html',
    styleUrls: ['app.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
    
    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}
}