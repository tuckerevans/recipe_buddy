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
    var tmp_amount = parseFloat(formData.ingredients[0].amount)
      ingredients.push(new Ingredient(formData.ingredients[0].ingrName,
                                      (isNaN(tmp_amount) ? 0 : tmp_amount),
                                      formData.ingredients[0].unit,
                                      ""
                       ));
    }

    var steps = []
    for  (i = 0; i < formData.ingredients.length; i++) {
      var tmp_timer = parseInt(formData.steps[0].timer)
      steps.push(new Step(formData.steps[0].instruct,
                          (isNaN(tmp_timer) ? 0 : tmp_timer)
                       ));
    }

    var servingsTmp = parseFloat(formData.servingSize)
    var cookTimeTmp = parseInt(formData.cookTime)

    var recipe = new Recipe (0,                    //id
                             formData.recipeName,  //name
                             formData.desc,        //description
                             ingredients,          //ingredients
                             steps,                //steps
                             (isNaN(servingsTmp) ? 0 :servingsTmp), //servingSize
                             (isNaN(cookTimeTmp) ? 0 :cookTimeTmp),    //cookTime
                             0,                    //timesCooked
                             0,                    //rating
                             formData.tags.split(','),        //tags
                             formData.photos.split(',')       //photos
                             );
    this.restService.createRecipe(recipe).subscribe()
  }
}
