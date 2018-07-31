import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  public jokes: any;
  public id: number;

  constructor( private userService: UserService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
      this.getUserWall();
    }) 
  }

  getUserWall() {
    this.userService.getUserWall(this.id)
                  .then(resp => {
                    this.jokes = resp.data;
                  })
  }
}
