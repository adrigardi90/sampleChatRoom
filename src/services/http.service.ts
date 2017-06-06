import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpService {

	private url = 'http://localhost:3000/api';
	private headers = new Headers({'Content-type': 'application/json'});
	private requestOptions;

	constructor(private http: Http){}

	request(user: any, url: string) : Observable<any>{

		this.requestOptions = new RequestOptions({
			method: RequestMethod.Post,
			url: this.url + url,
			headers: this.headers,
			body: JSON.stringify(user)
		});

		return this.http.request(new Request(this.requestOptions)).map( 
				(response) => {
			 		return response.json();
			}).catch( 
				(err: Response | any) => {
				 	return Observable.throw(err.json().error || 'Server error');
			});
	}
}