import {Component, OnInit} from '@angular/core';
import {Recipe} from '../DataModels/recipe';
import {Step} from '../DataModels/step';
import {RecipePassService} from '../recipePass/recipe-pass.service'

@Component({
  selector: 'app-cook-page',
  templateUrl: './cook-page.component.html',
  styleUrls: ['./cook-page.component.css'],
})
export class CookPageComponent implements OnInit {
	steps: Step[];
	stepNum: number;

	firstStep: boolean = true;
	lastStep: boolean = false;

	previousStep: string;
	currentStep: string;
	nextStep: string;
	timeLeft: number;

	timerInterval;

	constructor(private recipePass: RecipePassService){}

	ngOnInit() {
		this.getSteps();
		this.stepNum = 1;
		this.currentStep = this.steps[this.stepNum-1].getInstruction();
		this.nextStep = this.steps[this.stepNum].getInstruction();
		this.timeLeft = this.steps[this.stepNum-1].getTimer();
	}

	getSteps(): void {
/**		
*		var recipe: Recipe;
*		recipe = this.recipePass.getRecipe();
*		this.steps = recipe.getSteps();
*/
		var tmpSteps: Step[] = [];
		tmpSteps[0] = new Step("Cut the bread", 0);
		tmpSteps[1] = new Step("Warm the butter", 5);
		tmpSteps[2] = new Step("Enjoy", 0);
		this.steps = tmpSteps;
	}

	next(): void {
		this.firstStep = false;
		clearInterval(this.timerInterval);
		this.stepNum++;
		if(this.stepNum == this.steps.length) {			
			this.lastStep = true;
		} else {
			this.nextStep = this.steps[this.stepNum].getInstruction();
		}
		this.previousStep = this.steps[this.stepNum-2].getInstruction();
		this.currentStep = this.steps[this.stepNum-1].getInstruction();
		this.timeLeft = this.steps[this.stepNum-1].getTimer();
	}

	previous(): void {
		this.lastStep = false;
		clearInterval(this.timerInterval);
		this.stepNum--;
		if(this.stepNum == 1) {
			this.firstStep = true;
		} else {
			this.previousStep = this.steps[this.stepNum-2].getInstruction();
		}
		this.currentStep = this.steps[this.stepNum-1].getInstruction();
		this.nextStep = this.steps[this.stepNum].getInstruction();
		this.timeLeft = this.steps[this.stepNum-1].getTimer();
	}
	
	hasTimer(): boolean {
		if(this.steps[this.stepNum - 1].getTimer() > 0)
			return true;
		else
			return false;
	}

	startTimer(): void {
		this.timerInterval = setInterval(() => {
			if(this.timeLeft > 0) {
				this.timeLeft --;
			}
			else {
				clearInterval(this.timerInterval);
			}
		}, 1000)
	}
}
