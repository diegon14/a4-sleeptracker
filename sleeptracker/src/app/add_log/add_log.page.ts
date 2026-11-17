import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonDatetime} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-log',
    templateUrl: 'add_log.page.html',
    styleUrls: ['add_log.page.scss'],
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonDatetime, FormsModule],
})

export class LogPage {
    constructor(public sleepService:SleepService) {

    }

    ngOnInit() {

    }
}