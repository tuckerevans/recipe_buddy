export class Ingredients {
	private names: string[];
	private amounts: number[];
	private units: string[];
	private types: string[];

	public constructor(names: string[], amounts: number[], units: string[], types: string[]) {
		this.names = names;
		this.amounts = amounts;
		this.units = units;
		this.types = types;
	}

	public getNames(): string[] {
		return this.names;
	}

	public getAmounts(): number[] {
		return this.amounts;
	}

	public getUnits(): string[] {
		return this.units;
	}

	public getTypes(): string[] {
		return this.types;
	}
}
