import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/models/products.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-produktsiya',
  templateUrl: './produktsiya.component.html',
  styleUrls: ['./produktsiya.component.sass']
})
export class ProduktsiyaComponent implements OnInit {
  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productsService
      .getProduct(this.route.snapshot.params.product)
      .subscribe((product: IProduct) => {
        this.product = product;
      });
  }
}
