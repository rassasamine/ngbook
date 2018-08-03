import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private notifyService: NotifyService) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.auth.login(form.value.email, form.value.password)
      .then((userData) => {
        this.auth.logUserIn(userData);
      })
      .catch(error => {
        this.notifyService.notify(error.error, 'error')
      })

  }

}
