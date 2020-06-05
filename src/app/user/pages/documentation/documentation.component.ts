import { Component, OnInit } from '@angular/core';
import {
  IAllDocuments,
  IDocument
} from '../../../shared/models/document.model';
import { DocumentService } from '../../../shared/services/document.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.sass']
})
export class DocumentationComponent implements OnInit {
  documents: IDocument[];

  constructor(private documentsService: DocumentService) {}

  ngOnInit() {
    this.documents = [];
    this.documentsService
      .getDocuments(1000, 0)
      .subscribe((documents: IAllDocuments) => {
        this.documents = documents.data;
      });
  }
}
