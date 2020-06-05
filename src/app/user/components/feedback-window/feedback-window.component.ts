import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../../../shared/services/feedback.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedback-window',
  templateUrl: './feedback-window.component.html',
  styleUrls: ['./feedback-window.component.sass']
})
export class FeedbackWindowComponent implements OnInit {
  feedbackModel = {
    surname: [null, [Validators.required]],
    name: [null, [Validators.required]],
    middleName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    text: [null, [Validators.required]],
    unread: [null]
  };
  feedbackForm = this.fb.group(this.feedbackModel);

  get f() {
    return this.feedbackForm.controls as {
      [K in keyof this['feedbackModel']]: AbstractControl;
    };
  }

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.feedbackForm.reset();
  }

  sendFeedback() {
    this.feedbackForm.controls.unread.setValue(true);
    this.feedbackForm.markAllAsTouched();

    if (this.feedbackForm.invalid) {
      return;
    }
    this.feedbackService
      .addFeedback(this.feedbackForm.value)
      .subscribe(() => this.activeModal.close('submit'));
  }
}
