import { Component, Input, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonDatetime, IonModal, IonButtons, ModalController} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
    selector: 'app-add-log',
    templateUrl: 'add_log.page.html',
    styleUrls: ['add_log.page.scss'],
    imports: [IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonDatetime, FormsModule],
})

export class LogPage {
    @Input() current_date: string = "none";

    log_date_string: string | null = '';
    log_date_ISO: string = '';
    log_date: Date = new Date();
    bed_time_ISO: string = '';
    bed_time: Date = new Date();
    rest_time: number = 0;
    rest_time_string: string = '0';
    
    constructor(public route: ActivatedRoute, public sleepService:SleepService, public modalController: ModalController) {

    }

    onDateChange(event: any) {
        this.rest_time = ((Date.parse(this.log_date_ISO) - Date.parse(this.bed_time_ISO)) / (1000 * 60 * 60));
        console.log("wake up:" + Date.parse(this.log_date_ISO));
        console.log("bed:" + Date.parse(this.bed_time_ISO));
        console.log((Date.parse(this.log_date_ISO) - Date.parse(this.bed_time_ISO)));
        this.rest_time_string = this.rest_time.toFixed(2);
    }

    cancel() {
        this.modalController.dismiss(null, 'cancel');
    }

    logOvernight() {
        this.sleepService.logOvernightData(new OvernightSleepData(new Date(this.bed_time_ISO), new Date(this.log_date_ISO)));
        alert("Overnight Sleep Successfully Logged");
        this.cancel();
    }

    ngOnInit() {
        this.log_date = new Date(this.current_date);
        // this.log_date.setHours(this.log_date.getHours() - 8);
        this.log_date_string = this.log_date.toDateString();
        this.log_date_ISO = this.current_date
        
        this.bed_time = new Date(this.log_date);
        // set the bed time to a day before by default
        this.bed_time.setDate(this.log_date.getDate() - 1);
        this.bed_time_ISO = `${this.bed_time.getFullYear()}-${(this.bed_time.getMonth() + 1)}-${(this.bed_time.getDate())}` +
    	`T${(this.bed_time.getHours())}:${(this.bed_time.getMinutes())}:00`;

        // set the time slept for the first time
        console.log("bed time: " + this.bed_time_ISO);
        console.log("wake time: " + this.log_date_ISO);
        this.rest_time = (Date.parse(this.log_date_ISO) - Date.parse(this.bed_time_ISO)) / (1000 * 60 * 60);
        this.rest_time_string = this.rest_time.toFixed(2);
        
    }
}