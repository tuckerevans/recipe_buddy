import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CookPageComponent} from './cook-page/cook-page.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { PreCookPopUpComponent } from './pre-cook-pop-up/pre-cook-pop-up.component';
import { RecipePassService } from './recipePass/recipe-pass.service'
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    CookPageComponent,
    PreCookPopUpComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [RecipePassService],
  bootstrap: [AppComponent],
})
export class AppModule { }
