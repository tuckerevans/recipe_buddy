export class Step {
	public instructions: string;
	public timer: number;

	public constructor(instructions: string, timer: number) {
		this.instructions = instructions;
		this.timer = timer;
	}

	public getInstructions(): string {
		return this.instructions;
	}

	public getTimer(): number {
		return this.timer;
	}

}
