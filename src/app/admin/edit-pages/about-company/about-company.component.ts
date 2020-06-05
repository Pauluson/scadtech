import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ValuesService } from '../../../shared/services/values.service';
import {
  IAbout,
  IAllHistoryEvents,
  IAllValues,
  IHistoryEvent,
  IValue
} from '../../../shared/models/about-company-page.model';
import { AboutService } from '../../../shared/services/about.service';
import { HistoryEventsService } from '../../../shared/services/history-events.service';
import { NotificationComponent } from '../../edit-components/notification/notification.component';

@Component({
  selector: 'ap-edit-about-company',
  styleUrls: ['./about-company.component.sass'],
  templateUrl: './about-company.component.html'
})
export class EditAboutCompanyComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  pageSizeForHistory = 4;
  countHistoryEvents;
  pageSizeForValues = 3;
  countValues;
  page = 1;
  pageValue = 1;

  aboutModel = {
    title: [null, [Validators.required]],
    content: [
      '<p>This is the initial content of the editor</p>',
      [Validators.required]
    ]
  };
  aboutCompany = this.fb.group(this.aboutModel);

  historyEvents: IHistoryEvent[];
  values: IValue[];

  get f() {
    return this.aboutCompany.controls as {
      [K in keyof this['aboutModel']]: AbstractControl;
    };
  }

  constructor(
    private fb: FormBuilder,
    private aboutService: AboutService,
    private valuesService: ValuesService,
    private historyEventsService: HistoryEventsService
  ) {}

  ngOnInit(): void {
    this.historyEvents = [];
    this.values = [];

    this.aboutService.getAbout().subscribe((about: IAbout) => {
      this.aboutCompany.reset(about);
    });
    this.valuesService
      .getValues(
        this.pageSizeForHistory,
        this.pageSizeForHistory * (this.pageValue - 1)
      )
      .subscribe((values: IAllValues) => {
        this.countValues = values.count;
        this.values = values.data;
      });
    this.historyEventsService
      .getHistoryEvents(
        this.pageSizeForHistory,
        this.pageSizeForHistory * (this.page - 1)
      )
      .subscribe((historyEvents: IAllHistoryEvents) => {
        this.countHistoryEvents = historyEvents.count;
        this.historyEvents = historyEvents.data;
      });
  }

  saveInformationAC() {
    this.notify.emit({ type: 'success', message: 'Сохранено!' });
    this.aboutService.updateAbout(this.aboutCompany.value).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Сохранено!' });
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка сохранения!' })
    );
  }

  deleteHistoryEvent(row) {
    this.historyEvents.forEach((item, i) => {
      if (item.caption === row.caption) {
        this.historyEvents.splice(i, 1);
      }
    });
    this.historyEventsService.deleteHistoryEvent(row).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Удалено!' });
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка удаления!' })
    );
  }

  deleteValue(value) {
    this.values.forEach((item, i) => {
      if (item.name === value.name) {
        this.values.splice(i, 1);
      }
    });
    this.valuesService.deleteValue(value).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Удалено!' });
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка удаления!' })
    );
  }

  changePage(page) {
    this.historyEventsService
      .getHistoryEvents(
        this.pageSizeForHistory,
        this.pageSizeForHistory * (page - 1)
      )
      .subscribe((historyEvents: IAllHistoryEvents) => {
        this.historyEvents = historyEvents.data;
      });
  }

  changePageValues(page) {
    this.valuesService
      .getValues(this.pageSizeForValues, this.pageSizeForValues * (page - 1))
      .subscribe((values: IAllValues) => {
        this.values = values.data;
      });
  }
}
