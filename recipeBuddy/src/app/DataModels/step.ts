export class Steps {
	private instruction: string;
	private timer: number;

	public contructor(instruction: string, timer: number) {
		this.instruction = instruction;
		this.timer = timer;
	}

	public getInstruction(): string {
		return this.instruction;
	}

	public getTimer(): number {
		return this.timer;
	}

}
