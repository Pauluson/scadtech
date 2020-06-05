import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDocument } from '../../../shared/models/document.model';
import { DocumentService } from '../../../shared/services/document.service';

@Component({
  styleUrls: ['./edit-add-document.component.sass'],
  templateUrl: './edit-add-document.component.html'
})
export class EditAddDocumentComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter();
  fileURL: any;
  documentModel = {
    title: [null, [Validators.required]],
    date: [null, [Validators.required]],
    number: [null, [Validators.required]],
    validity: [null, []],
    descriptionIssuedBy: [null, []],
    descriptionTypesOfJobs: [null, []],
    link: [null, []]
  };
  state: boolean;
  document = this.fb.group(this.documentModel);

  get f() {
    return this.document.controls as {
      [K in keyof this['documentModel']]: AbstractControl;
    };
  }

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id === 'add') {
      this.state = true;
      this.document.reset();
    } else {
      this.state = false;
      this.documentService
        .getDocument(this.route.snapshot.params.id)
        .subscribe((value: IDocument) => {
          Object.keys(this.f).forEach(key => this.f[key].setValue(value[key]));
        });
    }
  }

  addDocument() {
    this.document.markAllAsTouched();
    if (this.document.invalid || !this.fileURL) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileURL);

    this.documentService.addDocument(this.document.value).subscribe(
      (document) => {
        this.notify.emit({ type: 'success', message: 'Запись добавлена!' });
        this.router.navigate(['/edit-services']);

        this.documentService
          .addFile(document._id, formData)
          .subscribe();
      },
      () => this.notify.emit({ type: 'error', message: 'Ошибка добавления!' })
    );
  }

  updateDocument() {
    this.document.markAllAsTouched();
    if (this.document.invalid) {
      return;
    }
    if (this.fileURL) {
      const formData = new FormData();
      formData.append('file', this.fileURL);
      this.documentService
        .addFile(this.route.snapshot.params.id, formData)
        .subscribe();
    }
    const localPartner = { ...this.document.value };
    delete localPartner.file;
    this.documentService
      .updateDocument(this.route.snapshot.params.id, this.document.value)
      .subscribe(
        () => {
          this.notify.emit({ type: 'success', message: 'Запись обновлена!' });
          this.router.navigate(['/edit-services']);
        },
        () => this.notify.emit({ type: 'error', message: 'Ошибка обновления!' })
      );
  }


  changeFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileURL = file;
  }
}
