import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { EventsComponent } from './events/events.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { OurLeadershipComponent } from './our-leadership/our-leadership.component';
import { NewsComponent } from './news/news.component';
import { ProduktsiyaComponent } from './produktsiya/produktsiya.component';
import { ProductionComponent } from './production/production.component';
import { PartnersAndCertificationsComponent } from './partners-and-certifications/partners-and-certifications.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { PagesComponent } from './pages.component';
import { ServicesComponent } from './services/services.component';
import { ServiceItemService } from 'src/app/shared/services/service-item.service';
import { ServiceItemComponent } from './service-item/service-item.component';

const routes: Routes = [
  { path: 'about', component: AboutCompanyComponent, data: { title: 'О компании' } },
  { path: 'production', component: ProductionComponent, data: { title: 'Продукция' } },
  { path: 'services', component: ServicesComponent, data: { title: 'Услуги' } },
  { path: 'service/:product', component: ServiceItemComponent, data: { title: 'Услуги' } },
  { path: 'contacts', component: ContactsComponent, data: { title: 'Контакты' } },
  { path: 'about/news', component: NewsComponent, data: { title: 'Новости' } },
  { path: 'about/news/:event', component: EventsComponent, data: { title: 'Событие' } },
  {
    path: 'about/partners-and-certifications',
    component: PartnersAndCertificationsComponent, data: { title: 'Партнеры и сертификаты' }
  },
  { path: 'about/our-leadership', component: OurLeadershipComponent, data: { title: 'Руководство' } },
  { path: 'production/:product', component: ProduktsiyaComponent, data: { title: 'Продукт' } },
  // { path: 'production/procurement', component: ProcurementComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' }
];

const rootRouter: Routes = [
  { path: '', component: PagesComponent, children: routes }
];
@NgModule({
  imports: [RouterModule.forChild(rootRouter)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
