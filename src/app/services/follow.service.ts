import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';
import { CONFIG } from './../config/config';
import { NgProgress } from '@ngx-progressbar/core'; 

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private headers: Headers;

  constructor(private authService: AuthService, private http: Http, private notifyService: NotifyService, private bar: NgProgress ) { 
    this.headers = new Headers({ 'Authorization' : `bearer ${this.authService.getToken()}` })
  }
  
  isFollowing(id: number): Promise<boolean> {
    let url = `${CONFIG.API_URL}/user/is/following`
    let body = { user_to_check_if_is_following_id: id }
    let options = new RequestOptions({ headers: this.headers })
    
    return this.http.post(url, body, options)
            .toPromise()
            .then(response => {
              return response.json().following
            })
  }

  follow(id: number) {

    // adding progress bar
    this.bar.start();

    let url = `${CONFIG.API_URL}/user/follow`
    let body = { user_to_follow_id: id }
    let options = new RequestOptions({ headers: this.headers })
    
    return this.http.post(url, body, options)
            .toPromise()
            .then(response => {
              this.bar.complete();
              return response.json();
            })
  }

  unFollow(id: number) {

    // adding progress bar
    this.bar.start();

    let url = `${CONFIG.API_URL}/user/unfollow`
    let body = { user_to_unfollow_id: id }
    let options = new RequestOptions({ headers: this.headers })
    
    return this.http.post(url, body, options)
            .toPromise()
            .then(response => {
              this.bar.complete();
              return response.json();
            })
  }
}
