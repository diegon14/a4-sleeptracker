import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonDatetime} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-log',
    templateUrl: 'add_log.page.html',
    styleUrls: ['add_log.page.scss'],
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonDatetime, FormsModule],
})

export class LogPage {
    log_date_string: string | null = '';
    log_date_ISO: string = '';
    log_date: Date = new Date();
    bed_time_ISO: string = '';
    bed_time: Date = new Date();
    rest_time: number = 0;
    rest_time_string: string = '0';
    constructor(public route: ActivatedRoute, public sleepService:SleepService) {

    }

    onDateChange(event: any) {
        this.rest_time = ((Date.parse(this.log_date_ISO) - Date.parse(this.bed_time_ISO)) / (1000 * 60 * 60));
        this.rest_time_string = this.rest_time.toFixed(2);
    }

    ngOnInit() {
        // gets the date from uri
        this.log_date_string = this.route.snapshot.paramMap.get('id');

        // gets the parts to format it into the global format
        let date_parts = this.log_date_string?.split('-');
        if (this.log_date_string !== null && date_parts !== undefined) {
            this.log_date = new Date(Number.parseInt(date_parts[2]), Number.parseInt(date_parts[0]) - 1, Number.parseInt(date_parts[1]));
            // ISO format is needed by ion-datetime
            this.log_date_ISO = this.log_date.toISOString();
        }
        this.log_date_string = this.log_date.toDateString();
        
        this.bed_time = new Date(this.log_date);
        // set the bed time to a day before by default
        this.bed_time.setDate(this.log_date.getDate() - 1);
        this.bed_time_ISO = this.bed_time.toISOString();

        // set the time slept for the first time
        this.rest_time = (Date.parse(this.log_date_ISO) - Date.parse(this.bed_time_ISO)) / (1000 * 60 * 60);
        this.rest_time_string = this.rest_time.toFixed(2);
        
    }
}