import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { Validators } from '@angular/forms';

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
    recipeName: ['', Validators.required],
    desc: [''],
    ingredients: this.fb.array([
      this.fb.group({
        ingrName: [''],
        amount: ['', Validators.pattern('^[0-9]*(\.[0-9]*)?$')],
        units: ['']
        })
    ]),
    steps: this.fb.array([
      this.fb.group({
        instruct: [''],
        timer: ['']
        })
    ]),
    servingSize: ['', Validators.pattern('^[0-9]*(\.[0-9]*)?$')],
    cookTime: ['', Validators.pattern('^[0-9]*$')],
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
      amount: ['', Validators.pattern('^[0-9]*(\.[0-9]*)?$')],
      units: ['']
      })
  );
  }

  rmIngredient(i) {
    this.ingredients.removeAt(i);
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(
    this.fb.group({
      instruct: [''],
      timer: ['', Validators.pattern('^[0-9]*$')]
      })
  );
  }

  rmStep(i) {
    this.steps.removeAt(i);
  }

  onSubmit() {
    var formData = this.recipeForm.value;

    var ingredients = []
    var i;
    for  (i = 0; i < formData.ingredients.length; i++) {
      ingredients.push(new Ingredient(formData.ingredients[0].ingrName,
                                      parseFloat(formData.ingredients[0].amount),
                                      formData.ingredients[0].unit,
                                      ""
                       ));
      if (isNaN(ingredients[ingredients.length - 1].amount)) {
        ingredients[ingredients.length - 1].amount = 0;
      }
    }

    var steps = []
    for  (i = 0; i < formData.ingredients.length; i++) {
      steps.push(new Step(formData.steps[0].instruct,
                          parseInt(formData.steps[0].timer)
                       ));
      if (isNaN(steps[steps.length - 1].timer)) {
        steps[steps.length - 1].timer = 0;
      }
    }

    var recipe = new Recipe (0,                    //id
                             formData.recipeName,  //name
                             formData.desc,        //description
                             ingredients,          //ingredients
                             steps,                //steps
                             parseFloat(formData.servingSize), //servingSize
                             parseInt(formData.cookTime),    //cookTime
                             0,                    //timesCooked
                             0,                    //rating
                             formData.tags.split(','),        //tags
                             formData.photos.split(',')       //photos
                             );
      if (isNaN(recipe.servingSize)) {
        recipe.servingSize = 0;
      }

      if (isNaN(recipe.cookTime)) {
        recipe.cookTime = 0;
      }
    this.restService.createRecipe(recipe).subscribe()
  }
}
