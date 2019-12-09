import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookPageComponent } from './cook-page/cook-page.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

const routes: Routes = [
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
	{ path: 'cook', component: CookPageComponent },
	{ path: 'main', component: RecipeCardComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
