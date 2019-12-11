import { Component, OnInit } from '@angular/core';
import { RecipePassService } from '../recipePass/recipe-pass.service';
import { Recipe } from '../DataModels/recipe';
import { Ingredient } from '../DataModels/ingredient';
import { BackendService } from '../REST_service/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-cook-pop-up',
  templateUrl: './pre-cook-pop-up.component.html',
  styleUrls: ['./pre-cook-pop-up.component.css']
//  providers: [RecipePassService]
})
export class PreCookPopUpComponent implements OnInit {

  cookedRecipe: Recipe;
  newSize: number;
  originalAmounts: number[] = [];
  originalSize: number;

  constructor(private recipePass: RecipePassService, private backend: BackendService, private router: Router) { }

  ngOnInit() {
	this.backend.getRecipe(20).subscribe(res =>
	{
		this.cookedRecipe = res;
		this.originalSize = this.cookedRecipe.servingSize;
		for(var _i = 0; _i < this.cookedRecipe.ingredients.length; _i++) {
			this.originalAmounts[_i] = this.cookedRecipe.ingredients[_i].amount;
		}
		this.recipePass.setRecipe(this.cookedRecipe);
	});
  }

  updateRecipe(event: any) {
	if(event.target.value) {
		this.newSize = parseInt(event.target.value);
		for(var _i = 0; _i < this.cookedRecipe.ingredients.length; _i++) {
			this.cookedRecipe.ingredients[_i].amount = Math.round(this.originalAmounts[_i] * (this.newSize / this.originalSize));
		}

		this.cookedRecipe.servingSize = this.newSize;
		this.recipePass.setRecipe(this.cookedRecipe);
	}
  }
}
