import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookPageComponent } from './cook-page/cook-page.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const routes: Routes = [
	{ path: '', redirectTo: '/cook', pathMatch: 'full' },
	{ path: 'cook', component: CookPageComponent },
	{ path: 'add', component: AddRecipeComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
