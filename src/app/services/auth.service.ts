import { Injectable } from '@angular/core';
import { CONFIG } from './../config/config';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserData } from './../classes/UserData';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http, private router: Router) { }

  register(name: string, email: string, password: string): Promise<UserData> {
    return this.http.post(`${CONFIG.API_URL}/register`, { name: name, email: email, password: password })
              .toPromise()
              .then((response) => {
                //  recover token and user settings from the server
                let token = response.json().token;
                let user = response.json().user;

                let userData = new UserData(token, user);
                return userData;
              })
  }

  logUserIn(userData): void {
    //  save token and user settings into browser
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));

    //  navigate the user to dashboard after registration
    this.router.navigate(['/dashboard']); 
  }

  
}



