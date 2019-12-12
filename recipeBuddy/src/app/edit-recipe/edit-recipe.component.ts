import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Recipe } from '../DataModels/recipe';
import { Ingredient } from '../DataModels/ingredient'
import { Step } from '../DataModels/step';
import { BackendService } from '../REST_service/backend.service';
import { RecipePassService } from '../recipePass/recipe-pass.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  baseRecipe: Recipe = this.passService.getRecipe();

  recipeForm = this.fb.group({
    recipeName: ['', Validators.required],
    desc: [''],
    ingredients: this.fb.array([
      this.fb.group({
        name: [''],
        amount: ['', Validators.pattern('^[0-9]*(\.[0-9]*)?$')],
        unit: ['']
        })
    ]),
    steps: this.fb.array([
      this.fb.group({
        instruction: [''],
        timer: ['']
        })
    ]),
    servingSize: ['', Validators.pattern('^[0-9]*(\.[0-9]*)?$')],
    cookTime: ['', Validators.pattern('^[0-9]*$')],
    tags: [''],
    photos: ['']
  });

  constructor(private fb: FormBuilder,
              private restService: BackendService,
              private router: Router,
              private passService: RecipePassService,
              )
  {
    restService.getRecipe(this.baseRecipe.id).subscribe(
      res=> this.updateRecipe(res),
      err=> console.log('EditRecipeComponent:restService:getRecipes: id='+ this.baseRecipe.id + 'err=' + err),
      () => console.log('EditRecipe:restService:getRecipes: completed')
    )

    this.rmIngredient(0);
    this.rmStep(0);
  }

  updateRecipe(r: Recipe)
  {
    var i: number;

    this.recipeForm.patchValue(
      {
        recipeName:  r.name,
        desc:        r.description,
        servingSize: r.servingSize,
        cookTime:    r.cookTime,
        tags:        r.tags.join(','),
        photos:      r.photos.join(','),
      }
    )

    console.log(r.tags.join(','));

    for(i = 0; i < r.ingredients.length; i++) {
      this.addIngredient();
      this.ingredients.controls[0].setValue(r.ingredients[i]);
    }
    for(i = 0; i < r.steps.length; i++) {
      this.addStep();
      console.log(r.steps[i])
      this.steps.controls[0].setValue(r.steps[i]);
    }
  }

  ngOnInit() {
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(
    this.fb.group({
      name: [''],
      amount: ['', Validators.pattern('^[0-9]*(\.[0-9]*)?$')],
      unit: ['']
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
      instruction: [''],
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
      ingredients.push(new Ingredient(formData.ingredients[0].name,
                                      (isNaN(tmp_amount) ? 0 : tmp_amount),
                                      formData.ingredients[0].unit,
                                      ""
                       ));
    }

    var steps = []
    for  (i = 0; i < formData.steps.length; i++) {
      var tmp_timer = parseInt(formData.steps[0].timer)
      steps.push(new Step(formData.steps[0].instruction,
                          (isNaN(tmp_timer) ? 0 : tmp_timer)
                       ));
    }

    console.log(steps);

    var servingsTmp = parseFloat(formData.servingSize)
    var cookTimeTmp = parseInt(formData.cookTime)

    var recipe = new Recipe (this.baseRecipe.id,                    //id
                             formData.recipeName,  //name
                             formData.desc,        //description
                             ingredients,          //ingredients
                             steps,                //steps
                             (isNaN(servingsTmp) ? 0 :servingsTmp), //servingSize
                             (isNaN(cookTimeTmp) ? 0 :cookTimeTmp),    //cookTime
                             0,                    //timesCooked
                             0,                    //rating
                             formData.tags.split(',').filter(word => !(word==="")),        //tags
                             formData.photos.split(',').filter(word => !(word===""))       //photos
                             );
    console.log(recipe)
    this.restService.updateRecipe(recipe).subscribe()
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
