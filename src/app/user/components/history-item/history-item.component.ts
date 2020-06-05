import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.sass']
})
export class HistoryItemComponent implements OnInit {
  @Input() historyEvent;
  constructor() {}

  ngOnInit() {}
}
