import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number;
  user: User;

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.id = +params['id'];
    })
    this.userService.getUserById(this.id).then((user) =>{
      this.user = user;
    })
  }

}
