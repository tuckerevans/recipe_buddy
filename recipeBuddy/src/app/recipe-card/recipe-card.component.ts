import {Component,OnInit} from '@angular/core';
import{BackendService} from '../REST_service/backend.service';
import{Recipe} from '../DataModels/recipe';
import {RecipePassService} from '../recipePass/recipe-pass.service';
//import { Observable } from "rxjs/Rx";


/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'RecipeCardComponent',
  templateUrl: 'recipe-card.component.html',
  styleUrls: ['recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
	
	constructor(private restService: BackendService,
				private recipePass: RecipePassService) {}
	
	
	recipes: Recipe[] = []; //array of recipe objects
	recipe: Recipe = new Recipe(0,"","",[],[],0,0,0,0,[],[]);

  ngOnInit() {
	  this.restService.getRecipes().subscribe(
	  res => {
		  var i: number;
		  for(i = 0; i < res.length; i++) {
			  this.restService.getRecipe(res[i]).subscribe(
				res2 => {
					this.recipes = [...this.recipes, res2]
					console.log(res2.photos)
				}, err => {/*Deal with error*/}, () => {/*Code for complete observable*/}
				
     );
    }
  },
  err => {
//Deal with error
  },
 () => {
//Complete observable
  }
);
  }
  
  
  cookPage(thisrecipe){
	this.recipePass.setRecipe(thisrecipe);
  }
  
  edit(thisrecipe) {
	this.recipePass.setRecipe(thisrecipe);
  }

  delete(id) {
		this.restService.getRecipe(id).subscribe(res => this.recipe = res)
		var txt = confirm("Are you sure you want to delete " + this.recipe.name + "?");
		if(txt == true)
		{
			alert(this.recipe.name + " was deleted.");
			this.restService.deleteRecipe(id).subscribe(res=> window.location.reload(), err => console.log(err));
		}
	}

	setRating(thisrecipe, newRating) {
		//Code here to set rating of thisrecipe to newRating
		thisrecipe.rating = newRating;
		this.restService.updateRecipe(thisrecipe).subscribe();
	}

}
