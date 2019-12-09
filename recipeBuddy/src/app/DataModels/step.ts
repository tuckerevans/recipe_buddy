export class Step {
	public instruction: string;
	public timer: number;

	public constructor(instruction: string, timer: number) {
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
