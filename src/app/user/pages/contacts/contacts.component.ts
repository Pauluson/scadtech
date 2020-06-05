import { Component, OnInit } from '@angular/core';
import { ContactsPageService } from '../../../shared/services/contacts-page.service';
import {
  IAllContacts,
  IContact
} from '../../../shared/models/contacts-page.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  headline = 'Контакты';
  contacts: IContact[];
  selectedContact: number;

  constructor(private contactsService: ContactsPageService) {}

  ngOnInit() {
    this.contacts = [];
    this.contactsService
      .getContacts(1000, 0)
      .subscribe((contacts: IAllContacts) => {
        this.contacts = contacts.data;
      });
  }

  openInformation(index: number) {
    this.selectedContact = index;
  }
}
