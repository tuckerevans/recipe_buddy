import { Component, OnInit } from '@angular/core';
import { RecipePassService } from '../RecipePass/recipe-pass.service';
import { Recipe } from '../DataModels/recipe';
import { BackendService } from '../REST_service/backend.service';

@Component({
  selector: 'app-pre-cook-pop-up',
  templateUrl: './pre-cook-pop-up.component.html',
  styleUrls: ['./pre-cook-pop-up.component.css']
})
export class PreCookPopUpComponent implements OnInit {

  cookedRecipe: Recipe;

  constructor(private recipePass: RecipePassService, private backend: BackendService) { }

  ngOnInit() {
	this.backend.getRecipe(1).subscribe(res =>
	{
		this.cookedRecipe = res
	});
	//this.recipeToBeCooked = this.recipePass.getRecipe();
  }
}
