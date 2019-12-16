import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Recipe } from '../DataModels/recipe';
import { BackendService } from '../REST_service/backend.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = this.fb.group(
    {searchField: ['', [Validators.required, Validators.pattern("^[A-Z0-9a-z ]*$")]]}
  )

  constructor(private restService: BackendService,
              private fb: FormBuilder,
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
      console.log("RECIPES: " + res);
    },
    err => {
    },
    () => {
    }
  )
  }

}
