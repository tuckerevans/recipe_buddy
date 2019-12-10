import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookPageComponent } from './cook-page/cook-page.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const routes: Routes = [
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
	{ path: 'cook', component: CookPageComponent },
	{ path: 'main', component: RecipeCardComponent },
	{ path: 'add', component: AddRecipeComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
