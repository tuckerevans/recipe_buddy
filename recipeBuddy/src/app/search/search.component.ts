import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Recipe } from '../DataModels/recipe';
import { BackendService } from '../REST_service/backend.service';
import { RecipePassService } from '../recipePass/recipe-pass.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = this.fb.group(
    {searchField: ['', [Validators.required, Validators.pattern("^[A-Z0-9a-z ]*$")]]}
  )
  recipes: Recipe[] = [];
  recipe: Recipe= null;

  constructor(private restService: BackendService,
              private fb: FormBuilder,
              private recipePass: RecipePassService,
              ) {}

  ngOnInit() {
  }

  onSubmit() {
    var searchData = this.searchForm.value;
    var query = searchData.searchField;
    query = query.replace("/ */g", "+");

    console.log("QUERY: " + query);

  this.restService.searchRecipes(query).subscribe(
    res => {
      this.recipes = [...[]]
      if (res) {
        for (var i = 0; i < res.length; i++)
        this.recipes = [...this.recipes, res[i]]
      }
      console.log(this.recipes)
    },
    err => {
    },
    () => {
    }
  )
  }

/*Pulled from recipe-card*/
  cookPage(thisrecipe){
    /**Code here to go to cook page for recipe with id */
    this.recipePass.setRecipe(thisrecipe);
  }

  edit(thisrecipe) {
    /**Code here to edit recipe with id */
    this.recipePass.setRecipe(thisrecipe);
  }

  delete(id) {
    /**Code here to delete recipe with id */
    this.restService.getRecipe(id).subscribe(res => this.recipe = res)
    var txt = confirm("Are you sure you want to delete " + this.recipe.name + "?");
    if(txt == true){
      alert(this.recipe.name + " was deleted.");
      this.restService.deleteRecipe(id).subscribe(res=> window.location.reload(), err => console.log(err));
    }
  }
}
