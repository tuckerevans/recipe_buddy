import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookPageComponent } from './cook-page/cook-page.component';

const routes: Routes = [
	{ path: '', redirectTo: '/cook', pathMatch: 'full' },
	{ path: 'cook', component: CookPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
