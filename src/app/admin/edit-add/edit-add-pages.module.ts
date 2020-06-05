import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditComponentsModule } from '../edit-components/edit-components.module';
import { EditAddLeadershipsComponent } from './edit-add-leaderships/edit-add-leaderships.component';
import { EditAddPartnersComponent } from './edit-add-partners/edit-add-partners.component';
import { EditAddNewsComponent } from './edit-add-news/edit-add-news.component';
import { EditAddConactsComponent } from './edit-add-conacts/edit-add-conacts.component';
import { EditAddHistoryEventComponent } from './edit-add-history-event/edit-add-history-event.component';
import { EditAddValuesComponent } from './edit-add-values/edit-add-values.component';
import { EditAddProductComponent } from './edit-add-product/edit-add-product.component';
import { EditAddDocumentComponent } from './edit-add-document/edit-add-document.component';
import { ComponentsModule } from '../../user/components/components.module';
import { FeedbackIdComponent } from './feedback-id/feedback-id.component';
import { EditAddServiceItemComponent } from './edit-add-service-item/edit-add-service-item.component';

@NgModule({
  imports: [
    NgbModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ComponentsModule,
    EditorModule,
    ReactiveFormsModule,
    EditComponentsModule
  ],
  declarations: [
    EditAddNewsComponent,
    EditAddLeadershipsComponent,
    EditAddPartnersComponent,
    EditAddConactsComponent,
    EditAddHistoryEventComponent,
    EditAddValuesComponent,
    EditAddDocumentComponent,
    EditAddProductComponent,
    FeedbackIdComponent,
    EditAddServiceItemComponent
  ],
  exports: [
    EditAddNewsComponent,
    EditAddLeadershipsComponent,
    EditAddPartnersComponent,
    EditAddConactsComponent,
    EditAddHistoryEventComponent,
    EditAddValuesComponent,
    EditAddDocumentComponent,
    EditAddProductComponent,
    FeedbackIdComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditAddModule {}
