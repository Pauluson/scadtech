import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPagesComponent } from './edit-pages.component';
import { EditContactsComponent } from './contacts/contacts.component';
import { EditNewsPageComponent } from './news-page/news-page.component';
import { EditPartnersAndSertificatesComponent } from './partners-and-sertificates/partners-and-sertificates.component';
import { EditDocumentationComponent } from './documentation/documentation.component';
import { EditOurLeadershipComponent } from './our-leadership/our-leadership.component';
import { EditAboutCompanyComponent } from './about-company/about-company.component';
import { EditAddNewsComponent } from '../edit-add/edit-add-news/edit-add-news.component';
import { EditAddLeadershipsComponent } from '../edit-add/edit-add-leaderships/edit-add-leaderships.component';
import { EditAddPartnersComponent } from '../edit-add/edit-add-partners/edit-add-partners.component';
import { EditAddConactsComponent } from '../edit-add/edit-add-conacts/edit-add-conacts.component';
import { EditAddHistoryEventComponent } from '../edit-add/edit-add-history-event/edit-add-history-event.component';
import { EditAddValuesComponent } from '../edit-add/edit-add-values/edit-add-values.component';
import { EditAddDocumentComponent } from '../edit-add/edit-add-document/edit-add-document.component';
import { EditProductionComponent } from './production/production.component';
import { EditAddProductComponent } from '../edit-add/edit-add-product/edit-add-product.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackViewComponent } from './view-feedback/feedback-view.component';
import { FeedbackIdComponent } from '../edit-add/feedback-id/feedback-id.component';
import { AuthGuard } from 'src/_helpers/auth.guard';
import { EditServiceComponent } from './service/service.component';
import { EditAddServiceItemComponent } from '../edit-add/edit-add-service-item/edit-add-service-item.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, data: { title: 'Профиль' } },
  { path: 'edit-news', component: EditNewsPageComponent, data: { title: 'Новости' } },
  { path: 'edit-news/:id', component: EditAddNewsComponent, data: { title: 'Новость' } },

  { path: 'edit-our-leadership', component: EditOurLeadershipComponent, data: { title: 'Руководство' } },
  { path: 'edit-our-leaderships/:id', component: EditAddLeadershipsComponent, data: { title: 'Руководитель' } },

  { path: 'edit-partners', component: EditPartnersAndSertificatesComponent, data: { title: 'Партнеры и сертификаты' } },
  { path: 'edit-partners/:id', component: EditAddPartnersComponent, data: { title: 'Партнер' } },

  { path: 'edit-contacts', component: EditContactsComponent, data: { title: 'Контакты' } },
  { path: 'edit-contacts/:id', component: EditAddConactsComponent, data: { title: 'Контакт' } },

  { path: 'edit-service', component: EditServiceComponent, data: { title: 'Услуги' } },
  { path: 'edit-service/:id', component: EditAddServiceItemComponent, data: { title: 'Услуги' } },

  { path: 'edit-about-company', component: EditAboutCompanyComponent, data: { title: 'О Компании' } },
  {
    path: 'edit-about-company/history-event/:id',
    component: EditAddHistoryEventComponent, data: { title: 'Историческое событие' }
  },
  { path: 'edit-about-company/values/:id', component: EditAddValuesComponent, data: { title: 'Разработки' } },

  { path: 'edit-production', component: EditProductionComponent, data: { title: 'Продукция' } },
  { path: 'edit-products/:id', component: EditAddProductComponent, data: { title: 'Продукт' } },

  { path: 'feedback', component: FeedbackViewComponent, data: { title: 'Обратная связь' } },
  { path: 'feedback/:id', component: FeedbackIdComponent, data: { title: 'Сообщение' } }
];
const rootRouters: Routes = [
  {
    path: '',
    component: EditPagesComponent,
    children: routes,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rootRouters)],
  exports: [RouterModule]
})
export class EditPagesRoutingModule {}
