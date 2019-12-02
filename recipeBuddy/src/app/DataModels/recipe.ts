import {Steps} from "./steps"
import {Ingredients} from "./ingredients"

export class Recipe {
	private id: number;
	private name: string;
	private description: string;
	private ingredients: Ingredient[];
	private steps: Step[];
	private servingSize: number;
	private cookTime: number;
	private rating: number;
	private tags: string[];

	public constructor(id: number, name: string, description: string, ingredients: Ingredients, steps: Steps, servingSize: number, cookTime: number, rating: number, tags: string[]) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.ingredients = ingredients;
		this.steps = steps;
		this.servingSize = servingSize;
		this.cookTime = cookTime;
		this.rating = rating;
		this.tags = tags;
	}

	public getId(): number {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getIngredients(): Ingredients {
		return this.ingredients;
	}

	public getSteps(): Steps {
		return this.steps;
	}

	public getServingSize(): number {
		return this.servingSize;
	}

	public getCookTime(): number {
		return this.cookTime;
	}

	public getRating(): number {
		return this.rating;
	}

	public getTags(): string[] {
		return this.tags;
	}
}
