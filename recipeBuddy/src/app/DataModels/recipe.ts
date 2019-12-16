import {Step} from "./step"
import {Ingredient} from "./ingredient"

export class Recipe {
	public id: number;
	public name: string;
	public description: string;
	public ingredients: Ingredient[];
	public steps: Step[];
	public servingSize: number;
	public cookTime: number;
	public timesCooked: number;
	public rating: number;
	public tags: string[];
	public photos: string[];
	public checked: boolean;

	public constructor(id: number,
                      name: string,
                      description: string,
                      ingredients: Ingredient[],
                      steps: Step[],
                      servingSize: number,
                      cookTime: number,
                      timesCooked: number,
                      rating: number,
                      tags: string[],
                      photos: string[]) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.ingredients = ingredients;
		this.steps = steps;
		this.servingSize = servingSize;
		this.cookTime = cookTime;
		this.rating = rating;
		this.tags = tags;
    this.photos = photos;
    this.timesCooked = timesCooked;
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
