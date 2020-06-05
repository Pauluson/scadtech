import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LeadershipsPageService } from '../../../shared/services/leaderships-page.service';
import {
  IAllLeaderships,
  ILeadership
} from '../../../shared/models/leaderships-page.model';

@Component({
  selector: 'app-edit-our-leadership',
  styleUrls: ['./our-leadership.component.sass'],
  templateUrl: './our-leadership.component.html'
})
export class EditOurLeadershipComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  headline = 'Наше руководство';
  leaderships;
  countLeaderships;
  pageSize = 8;
  page = 1;

  constructor(private leadershipService: LeadershipsPageService) {}

  ngOnInit() {
    this.leaderships = [];
    this.leadershipService
      .getLeaderships(this.pageSize, this.pageSize * (this.page - 1))
      .subscribe((leaderships: IAllLeaderships) => {
        this.countLeaderships = leaderships.count;
        this.leaderships = leaderships.data;
      });
  }

  deleteItem(leader) {
    this.leaderships.forEach((item, i) => {
      if (item._id === leader._id) {
        this.leaderships.splice(i, 1);
      }
    });
    this.leadershipService.deleteLeadership(leader).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Удалено!' });
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка удаления!' })
    );
  }

  changePage(page) {
    this.leadershipService
      .getLeaderships(this.pageSize, this.pageSize * (page - 1))
      .subscribe((leaderships: IAllLeaderships) => {
        this.leaderships = leaderships.data;
      });
  }
}
