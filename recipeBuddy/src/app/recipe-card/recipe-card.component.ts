import {Component,OnInit} from '@angular/core';
import{BackendService} from '../REST_service/backend.service';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'RecipeCardComponent',
  templateUrl: 'recipe-card.component.html',
  styleUrls: ['recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
	
	constructor(private restService: BackendService) {}
	
	recipes = []; //array of recipe objects
	mynumbers = [];

  ngOnInit() {
	  this.restService.getRecipes().subscribe(
	  res => {
		  var i: number;
		  for(i = 0; i < res.length; i++) {
			  this.restService.getRecipe(res[i]).subscribe(
				res2 => {
					this.recipes.push(res2)
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
	for(var i = 0; i <10; ++i)
	{
		mynumbers.push(i);
	}
  }
  
  shoppingCart() {
    /**Code here to open shopping cart */
  }
  
  cookPage(id){
    /**Code here to go to cook page for recipe with id */
	//this.recipes[id];
  }
  
  edit(id) {
    /**Code here to edit recipe with id */
  }

  delete(id) {
    /**Code here to delete recipe with id */
  }
}
  