import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { EditPagesModule } from './admin/edit-pages/edit-pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditAddModule } from './admin/edit-add/edit-add-pages.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './user/components/components.module';
import { PagesModule } from './user/pages/pages.module';
import { FeedbackWindowComponent } from './user/components/feedback-window/feedback-window.component';
import { NotifierModule } from 'angular-notifier';
import { JwtInterceptor } from 'src/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/_helpers/error.interceptor';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    EditPagesModule,
    EditAddModule,
    BrowserAnimationsModule,
    AngularFullpageModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left',
          distance: 12
        },
        vertical: {
          position: 'bottom',
          distance: 12,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [ FeedbackWindowComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
