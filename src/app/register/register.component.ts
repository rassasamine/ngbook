import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private notifyService: NotifyService) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.authService.register(form.value.name, form.value.email, form.value.password)
      .then((userData) => {
        this.authService.logUserIn(userData)
      })
      .catch(error =>{
        this.notifyService.notify(error.error, 'error');
      })
  }

}
