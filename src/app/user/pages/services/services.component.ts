import { Component, OnInit } from '@angular/core';
import { IAbout } from 'src/app/shared/models/about-company-page.model';
import { ServicesService } from 'src/app/shared/services/services.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit {
  about: IAbout;

  constructor(private serviceService: ServicesService) {}

  ngOnInit() {
    this.serviceService.getAbout().subscribe((about: IAbout) => {
      this.about = about;
    });
  }
}

