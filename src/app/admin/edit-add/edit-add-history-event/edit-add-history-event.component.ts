import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryEventsService } from '../../../shared/services/history-events.service';
import { IHistoryEvent } from '../../../shared/models/about-company-page.model';

@Component({
  styleUrls: ['./edit-add-history-event.component.sass'],
  templateUrl: './edit-add-history-event.component.html'
})
export class EditAddHistoryEventComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();

  historyEventModel = {
    year: [null, [Validators.required]],
    caption: [null, [Validators.required]],
    description: [null, [Validators.required]]
  };
  state: boolean;
  historyEvent = this.fb.group(this.historyEventModel);

  get f() {
    return this.historyEvent.controls as {
      [K in keyof this['historyEventModel']]: AbstractControl;
    };
  }

  constructor(
    private fb: FormBuilder,
    private historyEventsService: HistoryEventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id === 'add') {
      this.state = true;
      this.historyEvent.reset();
    } else {
      this.state = false;
      this.historyEventsService
        .getHistoryEvent(this.route.snapshot.params.id)
        .subscribe((event: IHistoryEvent) => {
          Object.keys(this.f).forEach(key => this.f[key].setValue(event[key]));
        });
    }
  }

  addHistoryEvent() {
    this.historyEvent.markAllAsTouched();
    if (this.historyEvent.invalid) {
      return;
    }
    this.historyEventsService
      .addHistoryEvent(this.historyEvent.value)
      .subscribe(
        () => {
          this.notify.emit({ type: 'success', message: 'Запись добавлена!' });
          this.router.navigate(['/edit-about-company']);
        },
        () => this.notify.emit({ type: 'error', message: 'Ошибка добавления!' })
      );
  }

  updateHistoryEvent() {
    this.historyEvent.markAllAsTouched();
    if (this.historyEvent.invalid) {
      return;
    }
    this.historyEventsService
      .updateHistoryEvent(
        this.route.snapshot.params.id,
        this.historyEvent.value
      )
      .subscribe(
        () => {
          this.notify.emit({ type: 'success', message: 'Запись обновлена!' });
          this.router.navigate(['/edit-about-company']);
        },
        () => this.notify.emit({ type: 'error', message: 'Ошибка обновления!' })
      );
  }
}
