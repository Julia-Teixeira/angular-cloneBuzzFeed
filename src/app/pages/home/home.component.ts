import { Quizz } from './../../components/quizz/quizz.component.interface';
import { Component, OnInit } from '@angular/core';
import quizz_questions from './../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  quizzList = quizz_questions;

  constructor() {}

  ngOnInit(): void {}
}
