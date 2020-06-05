import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../../../shared/models/news-page.model';
import { NewsPageService } from '../../../shared/services/news-page.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {
  event;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsPageService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.event;
    this.newsService.getEvent(this.id).subscribe((event: IEvent) => {
      this.event = event;
    });
  }
  newEvent() {
    this.ngOnInit();
  }
}
