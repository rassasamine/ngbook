import { CONFIG } from './../config/config';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { NgProgress } from '@ngx-progressbar/core';


@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private headers: Headers;
  
  constructor(private authService: AuthService, private http: Http, private bar: NgProgress) {
    this.headers = new Headers({ 'Authorization' : `bearer ${this.authService.getToken()}` })
  }

  createJoke(joke) : Promise<any>{
    let url = `${CONFIG.API_URL}/jokes`
    this.bar.start()
    let body = { title: joke.title, joke: joke.content }
    let options = new RequestOptions({headers: this.headers});
  
    return this.http.post(url, body, options)
            .toPromise()
            .then(resp => {
              this.bar.complete();
              return resp.json();
            })
  }

  getAllJokes(endPoint?) {
    this.bar.start();
    
    let url;
    if(endPoint) url = endPoint;
    else url = `${CONFIG.API_URL}/jokes`
    
    let options = new RequestOptions({headers: this.headers});
  
    return this.http.get(url, options)
            .toPromise()
            .then(resp => {
              this.bar.complete(); 
              return resp.json();
            })
  }
}
