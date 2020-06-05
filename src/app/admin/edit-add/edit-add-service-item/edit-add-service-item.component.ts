import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '../../../shared/models/news-page.model';
import { IProduct } from '../../../shared/models/products.model';
import { ServiceItemService } from 'src/app/shared/services/service-item.service';

@Component({
  selector: 'app-edit-add-service-item',
  templateUrl: './edit-add-service-item.component.html',
  styleUrls: ['./edit-add-service-item.component.sass']
})
export class EditAddServiceItemComponent implements OnInit  {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  imagePreview: ArrayBuffer | string;
  serviceModel = {
    name: [null, [Validators.required]],
    previewImage: [null, []],
    content: [
      '<p>This is the initial content of the editor</p>',
      [Validators.required]
    ]
  };
  state: boolean;
  events: IEvent[];
  serviceForm = this.fb.group(this.serviceModel);

  get f() {
    return this.serviceForm.controls as {
      [K in keyof this['serviceModel']]: AbstractControl;
    };
  }

  constructor(
    private fb: FormBuilder,
    private serviceItemService: ServiceItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.events = [];
    if (this.route.snapshot.params.id === 'add') {
      this.state = true;
      this.serviceForm.reset();
    } else {
      this.state = false;
      this.serviceItemService
        .getService(this.route.snapshot.params.id)
        .subscribe((product: IProduct) => {
          Object.keys(this.f).forEach(key =>
            this.f[key].setValue(product[key])
          );
        });
    }
  }

  addService() {
    this.serviceForm.markAllAsTouched();

    if (this.serviceForm.invalid) {
      return;
    }
    this.serviceItemService.addService(this.serviceForm.value).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Запись добавлена!' });
        this.router.navigate(['/edit-service']);
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка добавления!' })
    );
  }

  updateService() {
    this.serviceForm.markAllAsTouched();
    if (this.serviceForm.invalid) {
      return;
    }
    this.serviceItemService
      .updateService(this.route.snapshot.params.id, this.serviceForm.value)
      .subscribe(
        () => {
          this.notify.emit({ type: 'success', message: 'Запись обновлена!' });
          this.router.navigate(['/edit-service']);
        },
        () => this.notify.emit({ type: 'error', message: 'Ошибка обновления!' })
      );
  }
}