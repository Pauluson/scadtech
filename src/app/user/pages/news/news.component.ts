import { Component, OnInit } from '@angular/core';
import { NewsPageService } from '../../../shared/services/news-page.service';
import { IAllEvents } from '../../../shared/models/news-page.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
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
  toTranslit(title: string): string {
    return title.replace(/([а-яё])|([\s_-])|([^a-z\d])/gi, function(
      all,
      ch,
      space,
      words,
      i
    ) {
      if (space || words) {
        return space ? '-' : '';
      }
      const code = ch.charCodeAt(0),
        index =
          code == 1025 || code == 1105
            ? 0
            : code > 1071
            ? code - 1071
            : code - 1039,
        t = [
          'yo',
          'a',
          'b',
          'v',
          'g',
          'd',
          'e',
          'zh',
          'z',
          'i',
          'y',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'r',
          's',
          't',
          'u',
          'f',
          'h',
          'c',
          'ch',
          'sh',
          'shch',
          '',
          'y',
          '',
          'e',
          'yu',
          'ya'
        ];
      return t[index];
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
