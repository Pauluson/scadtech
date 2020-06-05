import { Component, OnInit } from '@angular/core';
import { IAbout } from '../../../shared/models/about-company-page.model';
import { AboutService } from '../../../shared/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  aboutCompany: IAbout;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.aboutService.getAbout().subscribe((about: IAbout) => {
      this.aboutCompany = about;
    });
  }
}
