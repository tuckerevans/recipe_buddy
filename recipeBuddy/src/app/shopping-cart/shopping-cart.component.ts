import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { BackendService } from '../REST_service/backend.service';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../DataModels/recipe';
import { Ingredient } from '../DataModels/ingredient';





@Component({
  selector: 'shopping-cart.component',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
	
  recipes: Recipe[] = [];
  ingredients : Ingredient[] = [];
  units: string[] = [];
  amounts: number[] = [];
  types: string[] = [];
  rIDs: number[] = [];



  constructor( private restService: BackendService) {

	  this.restService.getRecipes().subscribe( 
		res => {
		  var i: number; 
		  for(i = 0; i < res.length; i++) {
			this.restService.getRecipe(res[i]).subscribe(
				res2 => {
					this.recipes.push(res2)
				});
			}
	    });
	  
  }
  
  

  ngOnInit() {
  }

  addAll(): void {

  }
  addRecipe(id: number): void {
	
  }
  addIngredient(ing: Ingredient): void {
	 this.ingredients.push(ing);

  }
  printList(): void {
    
  }
}
