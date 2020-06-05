import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ItemComponent } from './item/item.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [ItemComponent, NotificationComponent],
  imports: [
    NgbModule,
    RouterModule,
    FormsModule,
    CommonModule,
    DragDropModule,
    EditorModule
  ],
  exports: [ItemComponent, NotificationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditComponentsModule {}
