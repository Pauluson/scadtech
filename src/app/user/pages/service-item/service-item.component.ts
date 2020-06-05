import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/models/products.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { ServiceItemService } from 'src/app/shared/services/service-item.service';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.sass']
})
export class ServiceItemComponent implements OnInit {
  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private serviceItemService: ServiceItemService
  ) {}

  ngOnInit() {
    this.serviceItemService
      .getService(this.route.snapshot.params.product)
      .subscribe((product: IProduct) => {
        this.product = product;
      });
  }
}

