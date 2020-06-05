import { Component, OnInit, ViewChild } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { NotificationComponent } from '../edit-components/notification/notification.component';
import { ProfileService } from '../../shared/services/profile.service';
import { IProfile } from '../../shared/models/profile.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-pages',
  styleUrls: ['./edit-pages.component.sass'],
  templateUrl: './edit-pages.component.html'
})
export class EditPagesComponent implements OnInit {
  @ViewChild('notification', { static: true })
  notification: NotificationComponent;
  menu = MENU_ITEMS;
  logo: string;
  constructor(public profileService: ProfileService,
              private authenticationService: AuthenticationService,
              private router: Router) {  }

  ngOnInit() {}

  onActivate(componentReference) {
    componentReference.notify.subscribe(data => {
      this.notification.showNotification(data.type, data.message);
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }
}
