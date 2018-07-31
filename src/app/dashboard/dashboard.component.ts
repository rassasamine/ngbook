import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public data;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.getJokes();
  }

  getPrevJokes() {
    this.getJokes(this.data.prev_page_url)
  }

  getNextJokes() {
    this.getJokes(this.data.next_page_url)
  }

  getJokes(endPoint?) {
    this.jokeService.getAllJokes(endPoint)
        .then(resp => {
          this.data = resp;
          console.log(resp);
        })
  }
}
