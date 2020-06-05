import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IValue } from '../../../shared/models/about-company-page.model';
import { ValuesService } from '../../../shared/services/values.service';

@Component({
  styleUrls: ['./edit-add-values.component.sass'],
  templateUrl: './edit-add-values.component.html'
})
export class EditAddValuesComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  imageURL: any;
  imagePreview: ArrayBuffer | string;

  valueModel = {
    image: [null, []],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]]
  };
  state: boolean;
  worth = this.fb.group(this.valueModel);

  get f() {
    return this.worth.controls as {
      [K in keyof this['valueModel']]: AbstractControl;
    };
  }

  constructor(
    private fb: FormBuilder,
    private valuesService: ValuesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id === 'add') {
      this.state = true;
    } else {
      this.state = false;
      this.valuesService
        .getValue(this.route.snapshot.params.id)
        .subscribe((value: IValue) => {
          Object.keys(this.f).forEach(key => this.f[key].setValue(value[key]));
        });
    }
  }

  addValue() {
    this.worth.markAllAsTouched();
    if (this.worth.invalid || !this.imageURL) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.imageURL);
    this.valuesService.addValue(this.worth.value).subscribe(
      value => {
        this.notify.emit({ type: 'success', message: 'Запись добавлена!' });
        this.router.navigate(['/edit-about-company']);
        this.valuesService
          .addImage(value._id, formData)
          .subscribe(() => console.log('Add Image!'));
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка добавления!' })
    );
  }

  updateValue() {
    if (
      this.worth.controls.name.invalid &&
      this.worth.controls.description.invalid
    ) {
      return;
    }
    this.worth.markAllAsTouched();
    if (this.imageURL) {
      const formData = new FormData();
      formData.append('image', this.imageURL);
      return this.valuesService
        .addImage(this.route.snapshot.params.id, formData)
        .subscribe(e => {
          this.worth.controls.image.setValue(e.image);
          this.valuesService
            .updateValue(this.route.snapshot.params.id, this.worth.value)
            .subscribe(
              value => {
                this.notify.emit({
                  type: 'success',
                  message: 'Запись обновлена!'
                });
                this.router.navigate(['/edit-about-company']);
              },
              () =>
                this.notify.emit({
                  type: 'error',
                  message: 'Ошибка обновления!'
                })
            );
        });
    }
    this.valuesService
      .updateValue(this.route.snapshot.params.id, this.worth.value)
      .subscribe(
        value => {
          this.notify.emit({ type: 'success', message: 'Запись обновлена!' });
          this.router.navigate(['/edit-about-company']);
        },
        () => this.notify.emit({ type: 'error', message: 'Ошибка обновления!' })
      );
  }

  changeValue(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageURL = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = file => {
      this.imagePreview = reader.result;
    };
  }
}
