import { Component, OnInit } from '@angular/core';
import { ProductionService } from '../../../shared/services/production.service';
import { IAbout } from '../../../shared/models/about-company-page.model';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.sass']
})
export class ProductionComponent implements OnInit {
  about: IAbout;

  constructor(private productionService: ProductionService) {}

  ngOnInit() {
    this.productionService.getAbout().subscribe((about: IAbout) => {
      this.about = about;
    });
  }
}
