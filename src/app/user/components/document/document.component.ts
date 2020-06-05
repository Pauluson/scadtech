import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.sass']
})
export class DocumentComponent implements OnInit {
  @Input() document;
  state: {
    title: boolean;
    number: boolean;
    date: boolean;
    descriptionIssuedBy: boolean;
    descriptionTypesOfJobs: boolean;
    link: boolean;
    validity: boolean;
  };
  constructor() {}

  ngOnInit() {
    Object.keys(this.document).forEach((key) => {
      if (this.document[key] === null) {
        this.state[key] = false;
      } else if (this.document[key]) {
        if (this.document[key].length === 0) {
          this.state[key] = false;
        } else {
          this.state[key] = true;
        }
      }
    });
  }
}
