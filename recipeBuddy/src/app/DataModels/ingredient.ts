export class Ingredient {
	private name: string;
	private amount: number;
	private unit: string;
	private type_: string;

	public constructor(name: string, amount: number, unit: string, type_: string) {
		this.name = names;
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