import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookPageComponent } from './cook-page/cook-page.component';
import { PreCookPopUpComponent } from './pre-cook-pop-up/pre-cook-pop-up.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { SearchComponent } from './search/search.component'

const routes: Routes = [
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
	{ path: 'main', component: RecipeCardComponent },
	{ path: 'preCook' , component: PreCookPopUpComponent },
	{ path: 'add', component: AddRecipeComponent },
	{ path: 'cook', component: CookPageComponent },
	{ path: 'edit', component: EditRecipeComponent },
	{ path: 'cart', component: ShoppingCartComponent },
	{ path: 'search', component: SearchComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
