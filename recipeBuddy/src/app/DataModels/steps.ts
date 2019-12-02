export class Steps {
	private instructions: string[];
	private timers: number[];

	public contructor(instructions: string[], timers: number[]) {
		this.instructions = instructions;
		this.timers = timers;
	}

	public getInstructions(): string[] {
		return this.instructions;
	}

	public getTimers(): number[] {
		return this.timers;
	}

}
