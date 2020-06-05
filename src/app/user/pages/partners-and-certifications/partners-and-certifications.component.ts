import { Component, OnInit } from '@angular/core';
import { PartnersPageService } from '../../../shared/services/partners-page.service';
import {
  IAllPartners,
  IPartners
} from '../../../shared/models/partners-page.model';

@Component({
  selector: 'app-partners-and-certifications',
  templateUrl: './partners-and-certifications.component.html',
  styleUrls: ['./partners-and-certifications.component.sass']
})
export class PartnersAndCertificationsComponent implements OnInit {
  headline = 'Партнеры и сертификаты';
  partners: IPartners[];

  constructor(private partnersService: PartnersPageService) {}

  ngOnInit() {
    this.partners = [];
    this.partnersService
      .getPartners(1000, 0)
      .subscribe((partners: IAllPartners) => {
        this.partners = partners.data;
      });
  }
}
