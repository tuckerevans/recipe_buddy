import {Component, OnInit} from '@angular/core';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-cook-page',
  templateUrl: './cook-page.component.html',
  styleUrls: ['./cook-page.component.css'],
})
export class CookPageComponent implements OnInit {
	step: number;
	instructions: string[] = ["Cut the bread", "Toast the bread", "Warm the butter", "Apply butter to bread", "Enjoy"];
	timers: number[] = [5,60,30,0,0];
	previousStep: string;
	currentStep: string;
	nextStep: string;
	timeLeft: number;

	timerInterval;

	ngOnInit() {
		this.step = 1;
		this.previousStep = "";
		this.currentStep = this.instructions[this.step-1];
		this.nextStep = this.instructions[this.step];
		this.timeLeft = this.timers[this.step-1];
	}

	next(): void {
		clearInterval(this.timerInterval);
		this.step++;
		this.previousStep = this.instructions[this.step-2];
		this.currentStep = this.instructions[this.step-1];
		this.nextStep = this.instructions[this.step];
		this.timeLeft = this.timers[this.step-1];
	}

	previous(): void {
		clearInterval(this.timerInterval);
		this.step--;
		this.previousStep = this.instructions[this.step-2];
		this.currentStep = this.instructions[this.step-1];
		this.nextStep = this.instructions[this.step];
		this.timeLeft = this.timers[this.step-1];
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

