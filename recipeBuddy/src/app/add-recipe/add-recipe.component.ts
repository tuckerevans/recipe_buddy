import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

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
}
