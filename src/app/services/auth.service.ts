import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserData } from '../classes/UserData';
import { NotifyService } from './notify.service';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http, private router: Router, private notifyService: NotifyService) { }

  register(name: string, email: string, password: string): Promise<UserData> {
    return this.http.post(`${CONFIG.API_URL}/register`, { name: name, email: email, password: password })
              .toPromise()
              .then((response) => {
                //  recover token and user settings from the server
                let token = response.json().token;
                let user = response.json().user; // user.data : problem with api : not same format

                let userData = new UserData(token, user);
                return userData;
              })
  }

  login(email: string, password: string): Promise<UserData> {
    return this.http.post(`${CONFIG.API_URL}/authenticate`, {email: email, password: password})
      .toPromise()
      .then((response) => {
        let token = response.json().token;
        let user = response.json().user; // user.data : problem with api
        
        let userData = new UserData(token, user);
        return userData;
      })
  }

  logUserIn(userData): void {
    //  save token and user settings into browser
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));

    //notification
    this.notifyService.notify('successfully logged in', 'success');

    //  navigate the user to dashboard after registration
    this.router.navigate(['/dashboard']); 
  }

  isLoggedIn(): boolean{
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    if(user && token) return true 
    return false
  }
  
  logOut(): void {

    // delete token and user settings from browser
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    //notification
    this.notifyService.notify('successfully logged out', 'success');

    //  navigate the user to login page after logout
    this.router.navigate(['/auth/login']); 
  }

  getAuthUser(): User {

    return JSON.parse(localStorage.getItem('user'));
  }

  getAuthUserId(): number {


    //  return JSON.parse(localStorage.getItem('user')).id;
    
    // static return as current userId only for test !!!  
    return 1;

  }

  getToken(): String{

    return localStorage.getItem('token');
  }

}



