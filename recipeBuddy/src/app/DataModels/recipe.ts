import {Step} from "./step"
import {Ingredient} from "./ingredient"

export class Recipe {
	private id: number;
	private name: string;
	private description: string;
	private ingredients: Ingredient[];
	private steps: Step[];
	private servingSize: number;
	private cookTime: number;
	private timesCooked: number;
	private rating: number;
	private tags: string[];
	private photos: string[];

	public constructor(id: number, name: string, description: string, ingredients: Ingredient[], steps: Step[], servingSize: number, cookTime: number, rating: number, tags: string[]) {
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

	public getIngredients(): Ingredient[] {
		return this.ingredients;
	}

	public getSteps(): Step[] {
		return this.steps;
	}

	public getServingSize(): number {
		return this.servingSize;
	}

	public getCookTime(): number {
		return this.cookTime;
	}
  
	public getTimesCooked(): number {
		return this.timesCooked;
	}
	public getRating(): number {
		return this.rating;
	}

	public getTags(): string[] {
		return this.tags;
	}
  
	public getPhotos(): string[] {
		return this.photos;
	}
}
