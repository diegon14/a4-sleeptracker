import { Component, ViewChild } from '@angular/core';
import { IonHeader, 
	IonToolbar, IonTitle, 
	IonContent, IonButton, 
	IonButtons, IonDatetime, 
	IonModal, IonItem,
	IonRange, IonLabel,
	IonCard, IonCardContent,
	IonCardHeader, ToastController, 
	IonCardTitle, IonList } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { LogPage } from '../add_log/add_log.page';

import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, 
	IonDatetime, FormsModule, IonModal, IonItem, IonRange, IonLabel, DatePipe, LogPage,
	IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList],
})
export class HomePage {
	sleepDate = '';

	reversedSleepData: SleepData[] = [];
  	
	constructor(
		public sleepService:SleepService,
		private toastController: ToastController
	) {}

	ngOnInit() {
		console.log(this.allSleepData);
		const date = new Date();
		let hours = date.getHours().toString().length === 1 ? `0${date.getHours().toString()}` : date.getHours().toString();
		let minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes().toString()}` : date.getMinutes().toString();
		this.sleepDate = `${date.getFullYear()}-${(date.getMonth() + 1)}-${(date.getDate())}` +
    	`T${hours}:${minutes}:00`;
		console.log(this.sleepDate);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	get latestSleepData() {
		return this.allSleepData[this.allSleepData.length - 1];
	}

	get logDateUrl() {
		let date_obj: Date;
		let formatted_date_string;
		date_obj = new Date(this.sleepDate);
		formatted_date_string = date_obj.toLocaleDateString().split("/").join("-");
		return "/create-log/" + formatted_date_string;
	}

	logSleep() {
		// TODO
		console.log("Selected Date", this.sleepDate);
		console.log(this.allSleepData);
	}


	// below used for log sleepieness model

	rating = 4;
	currentDate: Date = new Date();

	scaleValues = StanfordSleepinessData.ScaleValues;

	@ViewChild('allLogsModal') modal!: IonModal;

	@ViewChild('sleepinessModal') sleepinessModal!: IonModal;

	cancelAllLogsModal() {
    	this.modal.dismiss(null, 'cancel');
  	}

	cancelSleepinessModal() {
		this.sleepinessModal.dismiss(null, 'cancel');
	}

	reverseSleepLogs() {
		let sleepDataCopy = this.allSleepData.slice();
		this.reversedSleepData = sleepDataCopy.reverse();
	}

	async logSleepiness() {
		this.sleepService.logSleepinessData(new StanfordSleepinessData(Number(this.rating), this.currentDate));
		console.log(this.allSleepData)
		this.sleepinessModal.dismiss(null, 'cancel');

		const toast = await this.toastController.create({
			message: 'Sleepiness Successfully Logged',
			duration: 2500,
			position: 'top',
			color: 'success'
		});
		await toast.present()
	}
}
