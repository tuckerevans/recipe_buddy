export class Ingredient {
	public name: string;
	public amount: number;
	public unit: string;
	public type_: string;

	public constructor(name: string, amount: number, unit: string, type_: string) {
		this.name = name;
		this.amount = amount;
		this.unit = unit;
		this.type_ = type_;
	}

	public getName(): string {
		return this.name;
	}

	public getAmount(): number {
		return this.amount;
	}

	public getUnit(): string {
		return this.unit;
	}

	public getType(): string {
		return this.type_;
	}
}
