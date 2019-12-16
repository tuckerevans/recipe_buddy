import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { CookPageComponent} from './cook-page/cook-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { PreCookPopUpComponent } from './pre-cook-pop-up/pre-cook-pop-up.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    CookPageComponent,
    PreCookPopUpComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    ShoppingCartComponent,
    RecipeCardComponent
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
	MatDividerModule,
	MatCheckboxModule,
	MatListModule,
	FormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
