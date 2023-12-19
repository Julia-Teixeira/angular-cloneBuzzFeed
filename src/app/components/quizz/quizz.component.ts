import { Component, OnInit } from '@angular/core';
import { Option, Question } from './quizz.component.interface';
import quizz_questions from './../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: Question[] = [];
  questionsSelected: Question = {} as Question;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = this.questions.length;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;

      this.questionsSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionsSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.checkResult();
    }
  }

  checkResult() {
    const result = this.answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    this.answerSelected =
      quizz_questions.results[result as keyof typeof quizz_questions.results];
  }

  restart() {
    this.finished = false;
    this.questionIndex = 0;
    this.questionsSelected = this.questions[this.questionIndex];
    this.answers = [];
  }
}
