export class Step {
	public instruction: string;
	public timer: number;

	public constructor(instruction: string, timer: number) {
		this.instruction = instruction;
		this.timer = timer;
	}

	public getInstructions(): string {
		return this.instruction;
	}

	public getTimer(): number {
		return this.timer;
	}

}
