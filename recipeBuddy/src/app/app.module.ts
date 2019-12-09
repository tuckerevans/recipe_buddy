import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { CookPageComponent} from './cook-page/cook-page.component';
import { StepCardComponent } from './cook-page/step-card/step-card.component';

import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule } from '@angular/common/http';

import {ScrollingModule} from '@angular/cdk/scrolling';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    CookPageComponent,
    StepCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
	ScrollingModule,
	ScrollDispatchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
