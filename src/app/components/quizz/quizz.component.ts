import { Component, Input, OnInit } from '@angular/core';
import { Question, Quizz } from './quizz.component.interface';
import quizz_questions from './../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  @Input() idQuizz: number = 0;
  title: string = '';

  quizz: Quizz | undefined = {} as Quizz;
  questions: Question[] = [];
  questionsSelected: Question = {} as Question;

  answers: string[] = [];
  answerSelected: string | undefined = '';

  questionIndex: number = 0;
  questionMaxIndex: number = this.questions.length;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.quizz = this.getQuestionByIndex(+this.idQuizz);

    if (quizz_questions) {
      this.finished = false;
      this.title = this.quizz!.title;
      this.questions = this.quizz!.questions;

      this.questionsSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  getQuestionByIndex(index: number) {
    return quizz_questions.find((item) => item.id === index);
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
      this.quizz?.results[result as keyof typeof this.quizz.results];
  }

  restart() {
    this.finished = false;
    this.questionIndex = 0;
    this.questionsSelected = this.questions[this.questionIndex];
    this.answers = [];
  }
}
