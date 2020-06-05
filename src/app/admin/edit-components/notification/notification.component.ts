import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {
  @ViewChild('customNotification', { static: true }) customNotificationTmpl;
  private notifier: NotifierService;

  constructor(notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit() {}

  public showNotification(type: string, message: string): void {
    // this.notifier.notify(type, message);
    this.notifier.show({
      message: message,
      type: type,
      template: this.customNotificationTmpl
    });
  }

  public hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

  public hideNewestNotification(): void {
    this.notifier.hideNewest();
  }

  public hideAllNotifications(): void {
    this.notifier.hideAll();
  }

  public showCustomNotificationTemplate(
    type: string,
    message: string,
    id: string
  ): void {
    this.notifier.show({
      id,
      message,
      type,
      template: this.customNotificationTmpl
    });
  }

  public showSpecificNotification(
    type: string,
    message: string,
    id: string
  ): void {
    this.notifier.show({ id, message, type });
  }

  public hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }
}
