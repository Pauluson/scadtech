import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EditPagesComponent } from './edit-pages.component';
import { EditContactsComponent } from './contacts/contacts.component';
import { EditPartnersAndSertificatesComponent } from './partners-and-sertificates/partners-and-sertificates.component';
import { EditOurLeadershipComponent } from './our-leadership/our-leadership.component';
import { EditDocumentationComponent } from './documentation/documentation.component';
import { EditAboutCompanyComponent } from './about-company/about-company.component';
import { EditPagesRoutingModule } from './edit-pages-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditNewsPageComponent } from './news-page/news-page.component';
import { EditComponentsModule } from '../edit-components/edit-components.module';
import { EditAddModule } from '../edit-add/edit-add-pages.module';
import { EditProductionComponent } from './production/production.component';
import { AuthComponent } from '../../auth/auth.component';
import { FeedbackViewComponent } from './view-feedback/feedback-view.component';
import { ProfileComponent } from './profile/profile.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ComponentsModule } from '../../user/components/components.module';
import { EditServiceComponent } from './service/service.component';

@NgModule({
  imports: [
    EditPagesRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ComponentsModule,
    EditorModule,
    ReactiveFormsModule,
    EditComponentsModule,
    EditAddModule,
    ColorPickerModule
  ],
  declarations: [
    EditPagesComponent,
    EditAboutCompanyComponent,
    EditContactsComponent,
    EditDocumentationComponent,
    EditNewsPageComponent,
    EditOurLeadershipComponent,
    EditPartnersAndSertificatesComponent,
    EditProductionComponent,
    FeedbackViewComponent,
    ProfileComponent,
    EditServiceComponent
  ],
  exports: [
    EditPagesComponent,
    EditAboutCompanyComponent,
    EditContactsComponent,
    EditDocumentationComponent,
    EditNewsPageComponent,
    EditOurLeadershipComponent,
    EditPartnersAndSertificatesComponent,
    EditProductionComponent,
    FeedbackViewComponent,
    ProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditPagesModule {}
