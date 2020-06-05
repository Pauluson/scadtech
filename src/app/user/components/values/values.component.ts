import { Component, OnInit } from '@angular/core';
import {
  IAllValues,
  IValue
} from '../../../shared/models/about-company-page.model';
import { ValuesService } from '../../../shared/services/values.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.sass']
})
export class ValuesComponent implements OnInit {
  values: IValue[];

  constructor(private valuesService: ValuesService) {}

  ngOnInit() {
    this.values = [];

    this.valuesService.getValues(1000, 0).subscribe((values: IAllValues) => {
      this.values = values.data;
    });
  }
}
