import { Component, OnInit } from '@angular/core';
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { BackendService } from '../REST_service/backend.service';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../DataModels/recipe';
import { Ingredient } from '../DataModels/ingredient';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'shopping-cart.component',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {
	
  recipes: Recipe[] = [];
  ingredients : Ingredient[] = [];


  constructor( private restService: BackendService) {

	  this.restService.getRecipes().subscribe( 
		res => {
		  var i: number; 
		  for(i = 0; i < res.length; i++) {
			this.restService.getRecipe(res[i]).subscribe(
				res2 => {
		  res2.checked = false;
          for (var j = 0; j < res2.ingredients.length; j++) {
            res2.ingredients[j].checked = false;
            res2.ingredients[j].cart_index = -1;
          }
					this.recipes.push(res2)
				});
			}
	    });
	  
  }
  
  

  ngOnInit() {
  }

  addRecipe(rec: Recipe): void {
	rec.checked = !rec.checked;
	if(!rec.checked){
		for(var i = 0; i < rec.ingredients.length; i++) {
			rec.ingredients[i].checked = true;
			this.addIngredient(rec.ingredients[i]);
		}
	}
	
  }
  addIngredient(ing: Ingredient): void {
    ing.checked = !ing.checked;
    if (ing.checked){
      this.ingredients.push(ing);
      ing.cart_index = this.ingredients.length - 1;
    } else {
		this.ingredients.splice(ing.cart_index, 1);
		for(var i = 0; i < this.ingredients.length; i++) {
			this.ingredients[i].cart_index = i;
		}
	  }
  }
  
  addAll(rec: Recipe): void {
	  for(var i = 0; i < rec.ingredients.length; i++){
		  if(!rec.ingredients[i].checked){
			  this.addIngredient(rec.ingredients[i]);
		  }
	  }
  }
  
  printList(): void {
  }
}
