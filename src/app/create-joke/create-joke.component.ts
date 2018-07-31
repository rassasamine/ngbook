import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JokeService } from '../services/joke.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css']
})
export class CreateJokeComponent implements OnInit {

  //  working with ReactiveForms
  public jokeForm: FormGroup;

  constructor(private fb: FormBuilder, private jokeService: JokeService, private authService: AuthService, private router: Router,) { 
    this.createForm();
  }

  createForm() {
    //  the formBuilder allows us to create a formGroup using several formControls
    //  fb => formBuilder
    //  jokeForm => formGroup
    //  title, content => formControls
    //  required, minLength() => form validators status

    this.jokeForm = this.fb.group({
      title: [
        '', [Validators.required]
      ],
      content: [
        '', [Validators.required, Validators.minLength(5)]
      ]
    })
  }

  onSubmit() {
    this.jokeService.createJoke(this.jokeForm.value)
                    .then(resp => {
                      this.router.navigate(['/user/profile', this.authService.getAuthUserId()]);
                    })
  }

  ngOnInit() {
  }

}
