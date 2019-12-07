import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { Recipe } from '../DataModels/recipe';
import { Ingredient } from '../DataModels/ingredient'
import { Step } from '../DataModels/step';
import { BackendService } from '../REST_service/backend.service';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})

export class AddRecipeComponent {

  recipeForm = this.fb.group({
    recipeName: [''],
    desc: [''],
    ingredients: this.fb.array([
      this.fb.group({
        ingrName: [''],
        amount: [''],
        units: ['']
        })
    ]),
    steps: this.fb.array([
      this.fb.group({
        instruct: [''],
        timer: ['']
        })
    ]),
    servingSize: [''],
    cookTime: [''],
    tags: [''],
    photos: ['']
  });
  constructor(private fb: FormBuilder,
              private restService: BackendService
              ) { }

  ngOnInit() {
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(
    this.fb.group({
      ingrName: [''],
      amount: [''],
      units: ['']
      })
  );
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(
    this.fb.group({
      instruct: [''],
      timer: ['']
      })
  );
  }

  onSubmit() {
    var formData = this.recipeForm.value;

    var ingredients = []
    var i;
    for  (i = 0; i < formData.ingredients.length; i++) {
      ingredients.push(new Ingredient(formData.ingredients[0].ingrName,
                                      formData.ingredients[0].amount,
                                      formData.ingredients[0].unit,
                                      ""
                       ));
    }

    var steps = []
    for  (i = 0; i < formData.ingredients.length; i++) {
      steps.push(new Step(formData.steps[0].instruct,
                          formData.steps[0].timer
                       ));
    }

    var recipe = new Recipe (0,                    //id
                             formData.recipeName,  //name
                             formData.desc,        //description
                             ingredients,          //ingredients
                             steps,                //steps
                             formData.servingSize, //servingSize
                             formData.cookTime,    //cookTime
                             0,                    //timesCooked
                             0,                    //rating
                             formData.tags,        //tags
                             formData.photos       //photos
                             );
    console.log(JSON.stringify(recipe))
  }
}
