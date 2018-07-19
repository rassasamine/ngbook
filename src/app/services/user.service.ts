import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { CONFIG } from '../config/config';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userProfileUpdated: EventEmitter<User>;
  private headers: Headers;

  constructor(private authService: AuthService, private http: Http) {
    this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`});
    this.userProfileUpdated = new EventEmitter();
  }

   getUserById(id: number): Promise<User> {

    // if profileId equals to current user
    if(id == this.authService.getAuthUserId()){
      return Promise.resolve(this.authService.getAuthUser());
    }

    // if profileId different to current user
    let options = new RequestOptions({'headers' : this.headers});

    return this.http.get(`${CONFIG.API_URL}/user/${id}`, options)
              .toPromise()
              .then((response) => response.json())
   }

   updateProfile(name: string, email: string): Promise<User> {
     let url = `${CONFIG.API_URL}/user/update`;
     let body = {name: name, email: email};
     let options = new RequestOptions({headers: this.headers});

     return this.http.put(url, body, options)   
            .toPromise()
            .then((response) => {
              let user = response.json().data;
              localStorage.setItem('user', JSON.stringify(user));
              
              //  synchronous update : every time data changes, the profile UI changes 
              this.userProfileUpdated.emit(user);

              return user;
            })
    }
}
