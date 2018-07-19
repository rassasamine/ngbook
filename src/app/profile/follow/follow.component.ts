import { FollowService } from './../../services/follow.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  @Input() currentProfileId;
  public isFollowing: boolean;
  private isLoading: boolean = true;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.followService.isFollowing(this.currentProfileId)
            .then((response) => {
              this.isLoading = false;
              this.isFollowing = response;
            })
  } 

  follow() {
    this.followService.follow(this.currentProfileId)
          .then(() => {
            this.isFollowing = true;
          })
  }

  unFollow() {
    this.isLoading = true;
    this.followService.unFollow(this.currentProfileId)
          .then(() => {
            this.isLoading = false;
            this.isFollowing = false;
          })
  }

}
