import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IAllLeaderships } from '../../../shared/models/leaderships-page.model';
import { LeadershipsPageService } from '../../../shared/services/leaderships-page.service';

@Component({
  selector: 'app-our-leadership',
  templateUrl: './our-leadership.component.html',
  styleUrls: ['./our-leadership.component.sass'],
  providers: [NgbCarouselConfig]
})
export class OurLeadershipComponent implements OnInit {
  headline = 'Наше руководство';
  ourLeadership;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(private leadershipService: LeadershipsPageService) {}

  ngOnInit() {
    this.ourLeadership = [];
    this.leadershipService
      .getLeaderships(1000, 0)
      .subscribe((leaderships: IAllLeaderships) => {
        this.ourLeadership = leaderships.data;
      });
    this.carousel.pause();
  }
}
