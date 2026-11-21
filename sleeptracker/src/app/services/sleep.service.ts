import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	private storageReady: Promise<void>;

	constructor(private storage: Storage) {
		this.storageReady = this.initStorage();
	}

	private async initStorage() {
		await this.storage.create();
		// await this.storage.clear(); // used to test if default data populates

		const overnightData = await this.storage.get('overnightData');
		const sleepinessData = await this.storage.get('sleepinessData');
		const allData = await this.storage.get('allSleepData');

		if (overnightData !== null && sleepinessData !== null && allData !== null) {
			SleepService.AllOvernightData = overnightData.map((data: any) =>
				new OvernightSleepData(
					new Date(data.sleepStart),
					new Date(data.sleepEnd)
				)
			);

			SleepService.AllSleepinessData = sleepinessData.map((data: any) =>
				new StanfordSleepinessData(
					Number(data.loggedValue),
					new Date(data.loggedAt)
				)
			);

			SleepService.AllSleepData = allData.map((data: any) => {
				if (data.sleepStart !== undefined) {
					return new OvernightSleepData(
						new Date(data.sleepStart),
						new Date(data.sleepEnd)
					);
				} else {
					return new StanfordSleepinessData(
						Number(data.loggedValue),
						new Date(data.loggedAt)
					);
				}
			});

			console.log("Populated data from Ionic Storage");
		} else {
			if (SleepService.LoadDefaultData) {
				this.addDefaultData();
				SleepService.LoadDefaultData = false;
				console.log("Empty Data: populated with default data")
			}
			await this.saveData();
		}

		console.log('Hooray!! Ionic Storage Working!!!!!')
	}

	private async saveData() {
		await this.storage.set('overnightData', SleepService.AllOvernightData);
		await this.storage.set('sleepinessData', SleepService.AllSleepinessData);
		await this.storage.set('allSleepData', SleepService.AllSleepData);
	}

	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday

		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm

		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);

		void this.storageReady.then(() => this.saveData());
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);

		void this.storageReady.then(() => this.saveData());
	}
}
