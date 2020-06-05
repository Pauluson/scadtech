import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FeedbackService } from '../../../shared/services/feedback.service';
import {
  IAllFeedbacks,
  IFeedback
} from '../../../shared/models/feedback.model';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-feedback-view',
  styleUrls: ['./feedback-view.component.sass'],
  templateUrl: './feedback-view.component.html'
} )
export class FeedbackViewComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  pageSizeFeedbacks = 4;
  countFeedbacks;
  page = 1;
  feedbacks: IFeedback[];

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.feedbacks = [];
    this.feedbackService
      .getFeedbacks(
        this.pageSizeFeedbacks,
        this.pageSizeFeedbacks * (this.page - 1)
      )
      .subscribe( ( feedbacks: IAllFeedbacks ) => {
        this.countFeedbacks = feedbacks.count;
        this.feedbacks = feedbacks.data;
      } );
  }

  deleteFeedback( feedback ) {
    this.feedbacks.forEach( ( item, i ) => {
      if ( item.name === feedback.name ) {
        this.feedbacks.splice( i, 1 );
      }
    } );
    this.feedbackService
      .deleteFeedback( feedback )
      .subscribe( () => {
          this.notify.emit( {type: 'success', message: 'Удалено!'} );
        },
        () => this.notify.emit( {type: 'error', message: 'Ошибка удаления!'} )
      );
  }

  changePage( page ) {
    this.feedbackService
      .getFeedbacks( this.pageSizeFeedbacks, this.pageSizeFeedbacks * (page - 1) )
      .subscribe( ( feedbacks: IAllFeedbacks ) => {
        this.feedbacks = feedbacks.data;
      } );
  }
}
