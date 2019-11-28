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
