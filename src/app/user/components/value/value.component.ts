import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.sass']
})
export class ValueComponent implements OnInit {
  @Input() value;
  constructor() {}

  ngOnInit() {}
}
