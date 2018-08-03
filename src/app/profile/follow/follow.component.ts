import { FollowService } from './../../services/follow.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnChanges {

  @Input() currentProfileId;
  public isFollowing: boolean;
  public isLoading: boolean = true;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.checkIfFollowing();
  } 

  ngOnChanges(changes) {
    this.checkIfFollowing();
  }

  checkIfFollowing() {
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
