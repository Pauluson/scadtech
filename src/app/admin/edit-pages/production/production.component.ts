import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { IAllProducts } from '../../../shared/models/products.model';
import { ProductionService } from '../../../shared/services/production.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { IAbout } from '../../../shared/models/about-company-page.model';

@Component({
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.sass']
})
export class EditProductionComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  products;
  pageSize = 8;
  page = 1;
  countProducts;

  productionModel = {
    title: [null, [Validators.required]],
    content: [
      '<p>This is the initial content of the editor</p>',
      [Validators.required]
    ]
  };
  production = this.fb.group(this.productionModel);

  get f() {
    return this.production.controls as {
      [K in keyof this['productionModel']]: AbstractControl;
    };
  }
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private productionService: ProductionService
  ) {}

  ngOnInit() {
    this.products = [];
    this.productionService.getAbout().subscribe((about: IAbout) => {
      this.production.reset(about);
    });
    this.productsService
      .getProducts(this.pageSize, this.pageSize * (this.page - 1))
      .subscribe((products: IAllProducts) => {
        this.countProducts = products.count;
        this.products = products.data;
      });
  }

  deleteItem(event) {
    this.products.forEach((item, i) => {
      if (item._id === event._id) {
        this.products.splice(i, 1);
      }
    });
    this.productsService.deleteProduct(event).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Удалено!' });
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка удаления!' })
    );
  }

  changePage(page) {
    this.productsService
      .getProducts(this.pageSize, this.pageSize * (page - 1))
      .subscribe((products: IAllProducts) => {
        this.products = products.data;
      });
  }

  saveInformation() {
    this.productionService.updateAbout(this.production.value).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Сохранено!' });
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка сохранения!' })
    );
  }
}
