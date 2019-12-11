import {Component, OnInit} from '@angular/core';
import {Recipe} from '../DataModels/recipe';
import {Step} from '../DataModels/step';
import {RecipePassService} from '../recipePass/recipe-pass.service';

@Component({
  selector: 'app-cook-page',
  templateUrl: './cook-page.component.html',
  styleUrls: ['./cook-page.component.css']
})
export class CookPageComponent implements OnInit {
	recipe:Recipe;
	steps: Step[];
	stepNum: number;
	name: string;

	firstStep: boolean = true;
	lastStep: boolean = false;
	servingSize: number;

	previousStep: string;
	currentStep: string;
	nextStep: string;
	timeLeft: number;

	timeHoursFirst: number;
	timeHoursSecond: number;
	timeMinutesFirst: number;
	timeMinutesSecond: number;
	timeSecondsFirst: number;
	timeSecondsSecond: number;

	timerInterval;

	constructor(private recipePass: RecipePassService){}

	ngOnInit() {
		this.recipe = this.recipePass.getRecipe();
		this.name = this.recipe.name;
		this.steps = this.recipe.steps;
		this.servingSize = this.recipe.servingSize;
		this.stepNum = 1;
		this.currentStep = this.steps[this.stepNum-1].instruction;
		if(this.steps.length > 1)
			this.nextStep = this.steps[this.stepNum].instruction;
		else
			this.lastStep = true;

		this.timeLeft = this.steps[this.stepNum-1].timer*60;
		this.timeHoursFirst = Math.floor(this.timeLeft/3600/10);
		this.timeHoursSecond = Math.floor(this.timeLeft/3600%10);
		this.timeMinutesFirst = Math.floor(this.timeLeft%3600/60/10);
		this.timeMinutesSecond = Math.floor(this.timeLeft%3600/60%10);
		this.timeSecondsFirst = Math.floor(this.timeLeft%3600%60/10);
		this.timeSecondsSecond = Math.floor(this.timeLeft%3600%60%10);
	}

	next(): void {
		this.firstStep = false;
		clearInterval(this.timerInterval);
		this.stepNum++;
		if(this.stepNum == this.steps.length) {			
			this.lastStep = true;
		} else {
			this.nextStep = this.steps[this.stepNum].instruction;
		}
		this.previousStep = this.steps[this.stepNum-2].instruction;
		this.currentStep = this.steps[this.stepNum-1].instruction;
		this.timeLeft = this.steps[this.stepNum-1].timer*60;
		this.timeHoursFirst = Math.floor(this.timeLeft/3600/10);
		this.timeHoursSecond = Math.floor(this.timeLeft/3600%10);
		this.timeMinutesFirst = Math.floor(this.timeLeft%3600/60/10);
		this.timeMinutesSecond = Math.floor(this.timeLeft%3600/60%10);
		this.timeSecondsFirst = Math.floor(this.timeLeft%3600%60/10);
		this.timeSecondsSecond = Math.floor(this.timeLeft%3600%60%10);
	}

	previous(): void {
		this.lastStep = false;
		clearInterval(this.timerInterval);
		this.stepNum--;
		if(this.stepNum == 1) {
			this.firstStep = true;
		} else {
			this.previousStep = this.steps[this.stepNum-2].instruction;
		}
		this.currentStep = this.steps[this.stepNum-1].instruction;
		this.nextStep = this.steps[this.stepNum].instruction;
		this.timeLeft = this.steps[this.stepNum-1].timer*60;
		this.timeHoursFirst = Math.floor(this.timeLeft/3600/10);
		this.timeHoursSecond = Math.floor(this.timeLeft/3600%10);
		this.timeMinutesFirst = Math.floor(this.timeLeft%3600/60/10);	
		this.timeMinutesSecond = Math.floor(this.timeLeft%3600/60%10);
		this.timeSecondsFirst = Math.floor(this.timeLeft%3600%60/10);
		this.timeSecondsSecond = Math.floor(this.timeLeft%3600%60%10);
	}
	
	hasTimer(): boolean {
		if(this.steps[this.stepNum-1].timer > 0)
			return true;
		else
			return false;
	}

	startTimer(): void {
		console.log("timerStarted");
		this.timerInterval = setInterval(() => {
			if(this.timeLeft > 0) {
				this.timeLeft--;
				this.timeHoursFirst = Math.floor(this.timeLeft/3600/10);
				this.timeHoursSecond = Math.floor(this.timeLeft/3600%10);
				this.timeMinutesFirst = Math.floor(this.timeLeft%3600/60/10);
				this.timeMinutesSecond = Math.floor(this.timeLeft%3600/60%10);
				this.timeSecondsFirst = Math.floor(this.timeLeft%3600%60/10);
				this.timeSecondsSecond = Math.floor(this.timeLeft%3600%60%10);
			}
			else {
				clearInterval(this.timerInterval);
			}
		}, 1000)
	}
}
