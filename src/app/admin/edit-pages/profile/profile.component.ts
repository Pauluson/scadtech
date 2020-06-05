import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { IInformation, IProfile } from '../../../shared/models/profile.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { InformationService } from '../../../shared/services/information.service';
import { PasswordService } from '../../../shared/services/password.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.sass' ]
})
export class ProfileComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  profile: IProfile;
  imageURL: any;
  imagePreview: ArrayBuffer | string;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private informationService: InformationService,
    private passwordService: PasswordService
  ) {
  }

  profileModel = {
    color: [ null, [] ],
    image: [ null, [] ]
  };
  userModel = {
    old: [ null, [] ],
    new: [ null, [] ]
  };
  informationModel = {
    email: [ null, [] ],
    phone: [ null, [] ],
    tagline: [ null, [] ],
  };
  profileForm = this.fb.group(this.profileModel);
  userForm = this.fb.group(this.userModel);
  informationForm = this.fb.group(this.informationModel);

  get f() {
    return this.profileForm.controls as {
      [ K in keyof this[ 'profileModel' ] ]: AbstractControl;
    };
  }

  get fUser() {
    return this.userForm.controls as {
      [ K in keyof this[ 'userModel' ] ]: AbstractControl;
    };
  }

  get fInf() {
    return this.informationForm.controls as {
      [ K in keyof this[ 'informationModel' ] ]: AbstractControl;
    };
  }

  ngOnInit() {
    //Object.keys(this.f).forEach(key => this.f[ key ].setValue(this.profileService.profile[key]));
    this.informationService.getInformation().subscribe((inf: IInformation) => {
      
      Object.keys(this.fInf).forEach(key => this.fInf[ key ].setValue(inf[ key ]));
      this.profileService.getProfile().subscribe( profile =>
        {
          Object.keys(this.f).forEach(key => this.f[ key ].setValue(profile[key]));
        });
    });
  }

  changeColor(color) {
    document.documentElement.style.setProperty('--color', color);
    this.profileModel.color = color;
    this.f.color.setValue(color);
  }

  save() {
    if (this.imageURL) {
      const formData = new FormData();
      formData.append('image', this.imageURL);
      return this.profileService.addImage(formData)
        .subscribe(e => {
          this.f.image.setValue(`/i/${e.filename}`);
          this.profileService
            .updateData(this.profileForm.value)
            .subscribe(
              () => {
                this.notify.emit( {type: 'success', message: 'Запись обновлена!'} );
              },
              () =>
                this.notify.emit({ type: 'error', message: 'Ошибка обновления!' })
            );
        });
    }
    this.profileService
      .updateData(this.profileForm.value)
      .subscribe(
        () => {
          this.notify.emit({ type: 'success', message: 'Запись обновлена!' });
        },
        () => this.notify.emit({ type: 'error', message: 'Ошибка обновления!' })
      );
  }

  changeValue(event) {
    const file = (event.target as HTMLInputElement).files[ 0 ];
    this.imageURL = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = file => {
      this.imagePreview = reader.result;
    };
  }

  savePassword() {
    this.passwordService.updatePassword(this.userForm.value).subscribe(
      () => this.notify.emit({ type: 'success', message: 'Пароль обновлен!' }),
      () => this.notify.emit({ type: 'error', message: 'Пароль не обновлен!' }));
  }

  saveInf() {
    this.informationService.updateInformation(this.informationForm.value).subscribe(
      () => {
        this.notify.emit({ type: 'success', message: 'Информация обновлена!' })
      },
      () => this.notify.emit({ type: 'error', message: 'Информация не обновлена!' }));
  }
}
