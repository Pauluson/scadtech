import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import {
  IAllHistoryEvents,
  IHistoryEvent
} from '../../../shared/models/about-company-page.model';
import { HistoryEventsService } from '../../../shared/services/history-events.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  historyEvents: IHistoryEvent[];
  @ViewChild('item', { static: false })
  item: ElementRef;

  spacing = 370;
  initialPosition = { x: this.spacing, y: 0 };
  position = { ...this.initialPosition };
  offset = { x: 0, y: 0 };
  innerWidth = 1920;

  constructor(private historyEventsService: HistoryEventsService) {}

  ngOnInit() {
    this.historyEvents = [];
    this.historyEventsService
      .getHistoryEvents(1000, 0)
      .subscribe((historyEvents: IAllHistoryEvents) => {
        this.historyEvents = historyEvents.data;
      });
    this.calculate();
  }

  @HostListener('window:resize')
  calculate() {
    const displayWidth = window.innerWidth;
    const spacing = (displayWidth - 1240) / 2;
    spacing > 0
      ? (this.initialPosition.x = spacing)
      : (this.initialPosition.x = 0);
    this.spacing = spacing;
    this.innerWidth = displayWidth;
  }

  drag(event) {
    const transform = this.item.nativeElement.style.transform;
    const regex = /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
    const values = regex.exec(transform);
    this.offset = { x: parseInt(values[1]), y: parseInt(values[2]) };

    this.position.x = this.initialPosition.x + this.offset.x;
    this.position.y = this.initialPosition.y + this.offset.y;

    if (this.offset.x > this.spacing) {
      this.initialPosition = { x: this.spacing, y: 0 };
    } else if (this.offset.x < this.innerWidth - 2200) {
      this.initialPosition = { x: this.innerWidth - 2200 - this.spacing, y: 0 };
    }
  }
}
