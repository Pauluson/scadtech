import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackWindowComponent } from '../../components/feedback-window/feedback-window.component';
import { IInformation } from '../../../shared/models/profile.model';
import { InformationService } from '../../../shared/services/information.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  closeResult: string;
  phone: string;
  email: string;

  constructor(private modalService: NgbModal,
              private informationService: InformationService) {}

  ngOnInit() {
    this.informationService.getInformation().subscribe((inf: IInformation) => {
      this.email = inf.email;
      this.phone = inf.phone;
    });
  }
  open() {
    this.modalService
      .open(FeedbackWindowComponent, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg'
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
