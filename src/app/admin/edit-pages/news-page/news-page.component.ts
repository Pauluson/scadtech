import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewsPageService } from '../../../shared/services/news-page.service';
import { IAllEvents, IEvent } from '../../../shared/models/news-page.model';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.sass']
})
export class EditNewsPageComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  headline = 'Новости';
  events;
  pageSize = 8;
  page = 1;
  countEvents;
  constructor(private newsService: NewsPageService) {}

  ngOnInit() {
    this.events = [];
    this.newsService
      .getEvents(this.pageSize, this.pageSize * (this.page - 1))
      .subscribe((news: IAllEvents) => {
        this.countEvents = news.count;
        this.events = news.data;
      });
  }

  deleteItem(event) {
    this.newsService.deleteEvent(event).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Удалено!' });
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка удаления!' })
    );
    this.events.forEach((item, i) => {
      if (item._id === event._id) {
        this.events.splice(i, 1);
      }
    });
  }

  changePage(page) {
    this.newsService
      .getEvents(this.pageSize, this.pageSize * (page - 1))
      .subscribe((news: IAllEvents) => {
        this.events = news.data;
      });
  }
}
