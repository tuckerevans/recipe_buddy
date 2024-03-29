import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError, map } from 'rxjs/operators'
import { Recipe } from '../DataModels/recipe'


export interface Status {
	Code: number;
	Msg: string;
}
export interface MsgList {
	Status: Status;
	Data: number[];
}

export interface MsgRecipeList {
	Status: Status;
	Data: Recipe[];
}

export interface Msg {
	Status: Status;
	Data: Recipe;
}


@Injectable({ providedIn: 'root' })

/* BackendService class based on tutorial at:
 * <https://www.positronx.io/angular-8-httpclient-http-tutorial-build-consume-restful-api/>
 */
export class BackendService {
	apiURL = 'http://api.recipebuddy.xyz:8888'

	constructor( private http: HttpClient)
	{
	}

	httpOptions = {headers: new HttpHeaders(
		{'Content-Type':'application/json'}
	)}


	getRecipes(): Observable<number[]>
	{
		return this.http.get<MsgList>(this.apiURL + '/recipes')
			.pipe (
				retry(1),
				map(msg => msg.Data),
				catchError(this.handleError)
			)
	}


	getRecipe(id): Observable<Recipe>
	{
		return this.http.get<Msg>(this.apiURL + '/recipes/' + id)
			.pipe (
				retry(1),
				map(msg => msg.Data),
				catchError(this.handleError)
			)
	}

	createRecipe(data): Observable<Recipe>
	{
		return this.http.post<Recipe>(this.apiURL + '/recipes',
			JSON.stringify(data), this.httpOptions)
	}

	updateRecipe(data): Observable<Recipe>
	{
		return this.http.put<Recipe>(this.apiURL + '/recipes/' + data.id,
			JSON.stringify(data), this.httpOptions)
	}

	deleteRecipe(id): Observable<Msg>
	{
		return this.http.delete<Msg>(this.apiURL + '/recipes/' + id)
			.pipe (
				retry(1),
				catchError(this.handleError)
			)
	}

  searchRecipes(query: string): Observable<Recipe[]>
  {
		return this.http.get<MsgRecipeList>(this.apiURL + '/recipes?query=' + query)
			.pipe (
				retry(1),
				map(msg => msg.Data),
				catchError(this.handleError)
			)
  }

	handleError(error) {
		let errMsg = '';
		if (error.error instanceof ErrorEvent) {
			errMsg = error.error.message;
		} else {
			errMsg = 'Error API';
		}
		console.log(errMsg)
		window.alert(errMsg)
		return throwError(errMsg);
	}
}
