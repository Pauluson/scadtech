import { Component, OnInit } from '@angular/core';
import { ProfileService } from './shared/services/profile.service';
import { IProfile } from './shared/models/profile.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ]
})
export class AppComponent implements OnInit {
  title = 'Компания';

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
  }

  ngOnInit(): void {
    this.profileService.getData();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe((event) => {
        let title = this.title;
        if (event.title) {
          title += ` - ${event.title}`;
        }
        this.titleService.setTitle(title);
      });
  }

}
