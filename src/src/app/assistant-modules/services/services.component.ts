import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent {

  @Output() serviceSelected = new EventEmitter<string>();

  services: string[] = [
    "Transaction Details",
    "Re-assessment (Diversion)",
    "Re-assessment (Diversion) Fee Calculator",
    "Agri. Land Revenue Payment",
    "Diverted Land Revenue Payment",
    "Land Mortgage",
    "Village Map Purchase"
  ];

  selectService(service: string) {
    this.serviceSelected.emit(service);
  }
}
