import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../shared/services/feedback.service';
import { ActivatedRoute } from '@angular/router';
import { IFeedback } from '../../../shared/models/feedback.model';

@Component({
  selector: 'app-feedback-id',
  templateUrl: './feedback-id.component.html',
  styleUrls: ['./feedback-id.component.sass']
})
export class FeedbackIdComponent implements OnInit {
  feedback: IFeedback;

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.feedbackService
      .getFeedback(this.route.snapshot.params.id)
      .subscribe(feedBack => {
        this.feedback = feedBack;
        this.feedback.unread = false;
        this.feedbackService
          .updateFeedback(this.feedback)
          .subscribe(() => console.log('Update'));
      });
  }
}
