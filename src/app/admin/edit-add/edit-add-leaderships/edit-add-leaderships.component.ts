import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadershipsPageService } from '../../../shared/services/leaderships-page.service';
import { ILeadership } from '../../../shared/models/leaderships-page.model';

@Component({
  styleUrls: ['./edit-add-leaderships.component.sass'],
  templateUrl: './edit-add-leaderships.component.html'
})
export class EditAddLeadershipsComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  imageURL: any;
  imagePreview: ArrayBuffer | string;

  leaderModel = {
    name: [null, [Validators.required]],
    position: [null, [Validators.required]],
    image: [null, []]
  };
  state: boolean;
  leaderships: ILeadership[];
  leader = this.fb.group(this.leaderModel);

  get f() {
    return this.leader.controls as {
      [K in keyof this['leaderModel']]: AbstractControl;
    };
  }

  constructor(
    private fb: FormBuilder,
    private leadershipsService: LeadershipsPageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id === 'add') {
      this.state = true;
    } else {
      this.state = false;
      this.leadershipsService
        .getLeadership(this.route.snapshot.params.id)
        .subscribe((leadership: ILeadership) => {
          Object.keys(this.f).forEach(key =>
            this.f[key].setValue(leadership[key])
          );
        });
    }
  }

  addLeader() {
    this.leader.markAllAsTouched();
    if (this.leader.invalid || !this.imageURL) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.imageURL);
    this.leadershipsService.addLeadership(this.leader.value).subscribe(
      leader => {
        this.notify.emit({ type: 'success', message: 'Запись добавлена!' });
        this.router.navigate(['/edit-our-leadership']);
        this.leadershipsService
          .addImage(leader._id, formData)
          .subscribe(() => console.log('Add Image!'));
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка добавления!' })
    );
  }

  updateLeader() {
    this.leader.markAllAsTouched();
    if (this.leader.invalid) {
      return;
    }
    if (this.imageURL) {
      const formData = new FormData();
      formData.append('image', this.imageURL);
      return this.leadershipsService
        .addImage(this.route.snapshot.params.id, formData)
        .subscribe(e => {
          this.leader.controls.image.setValue(e.image);
          this.leadershipsService
            .updateLeadership(this.route.snapshot.params.id, this.leader.value)
            .subscribe(
              value => {
                this.notify.emit({
                  type: 'success',
                  message: 'Запись обновлена!'
                });
                this.router.navigate(['/edit-our-leadership']);
              },
              () =>
                this.notify.emit({
                  type: 'error',
                  message: 'Ошибка обновления!'
                })
            );
        });
    }
    this.leadershipsService
      .updateLeadership(this.route.snapshot.params.id, this.leader.value)
      .subscribe(
        value => {
          this.notify.emit({ type: 'success', message: 'Запись обновлена!' });
          this.router.navigate(['/edit-our-leadership']);
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
