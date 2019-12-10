import { Injectable } from '@angular/core';
import { Recipe } from '../DataModels/recipe';

@Injectable({
	providedIn: 'root',
})
export class RecipePassService {

	private sourceRecipe: Recipe;

  constructor() { }

	public setRecipe (recipeToPass: Recipe) {
		this.sourceRecipe = recipeToPass;
	}

	public getRecipe (): Recipe {
		return this.sourceRecipe;
	}
}
