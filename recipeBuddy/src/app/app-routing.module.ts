import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookPageComponent } from './cook-page/cook-page.component';
import { PreCookPopUpComponent } from './pre-cook-pop-up/pre-cook-pop-up.component';

const routes: Routes = [
	{ path: '', redirectTo: '/cook', pathMatch: 'full' },
	{path: 'preCook' , component: PreCookPopUpComponent },
	{ path: 'cook', component: CookPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
