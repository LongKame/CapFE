import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QuizService } from '../../_services/quiz.service';
import { TokenService } from '../../_services/token.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private ngZone: NgZone,
    private modalService: BsModalService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('cd', { static: false })
  countdown!: CountdownComponent;
  resultModalRef?: BsModalRef;
  confirmModalRef?: BsModalRef;

  countDownTime = 50 * 60;
  questions: any[] = [];
  currentQuestion: any = null;
  currentIndex = 0;
  userProfile: any;
  totalCorrect = 0;
  totalInprogress = 0;
  level = '1' as '1' | '2' | '3';

  ngOnInit(): void {
    this.init();
  }

  init(isRetest = false) {
    this.level = this.route.snapshot.params['level'];
    if (!['1', '2', '3'].includes(this.level)) {
      this.router.navigateByUrl('/academy/quiz');
      return;
    }

    this.userProfile = this.tokenService.getUserProfile();
    this.currentIndex = 0;
    this.currentQuestion = null;
    this.questions = [];
    this.totalCorrect = 0;
    this.totalInprogress = 0;

    this.quizService.getQuiz(this.level).subscribe((res: any) => {
      this.ngZone.run(() => {
        this.questions = res;
        if (!this.questions?.length) return;

        this.currentQuestion = this.questions[0];

        if (isRetest) {
          this.countdown.restart();
          this.countdown.resume();
        } else {
          this.countdown.begin();
        }
      });
    });
  }

  onNextQuestion() {
    const nextQuestion = this.questions[this.currentIndex + 1];
    if (!nextQuestion) return;

    this.currentQuestion = nextQuestion;
    this.currentIndex++;
  }

  onBackQuestion() {
    const prevQuestion = this.questions[this.currentIndex - 1];
    if (!prevQuestion) return;

    this.currentQuestion = prevQuestion;
    this.currentIndex--;
  }

  onAnswer(answer: string) {
    this.currentQuestion.userAnswer = answer;
  }

  onClickQuestionItem(i: number) {
    this.currentIndex = i;
    this.currentQuestion = this.questions[i];
  }

  countDownEvent(e: CountdownEvent, resultModal: any) {
    if (e.action === 'done') {
      this.showResult(resultModal);
    }
  }

  showResult(resultModal: any) {
    this.confirmModalRef?.hide();
    this.totalCorrect = this.questions.reduce(
      (sum, q) => sum + (q.userAnswer === q.correct ? 1 : 0),
      0
    );
    this.resultModalRef = this.modalService.show(resultModal, {
      ignoreBackdropClick: true,
    });
  }

  onRetest() {
    this.init(true);
    this.resultModalRef?.hide();
  }

  onQuite() {
    this.resultModalRef?.hide();
    this.router.navigateByUrl('/academy/quiz');
  }

  onSubmit(confirmModal: any) {
    this.totalInprogress = this.questions.reduce(
      (sum, q) => sum + (!!q.userAnswer ? 1 : 0),
      0
    );
    this.confirmModalRef = this.modalService.show(confirmModal, {
      ignoreBackdropClick: true,
    });
  }

  onFinalSubmit(resultModal: any) {
    this.showResult(resultModal);
  }
}
