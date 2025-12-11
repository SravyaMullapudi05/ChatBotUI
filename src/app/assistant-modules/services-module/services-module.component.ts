import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-services-module',
  templateUrl: './services-module.component.html',
  styleUrls: ['./services-module.component.css']
})
export class ServicesModuleComponent implements OnInit {

  @Input() subModules: any[] = [];
  @Input() moduleName: string;
  @Input() Allmessages: any[]=[]
  @Output() moduleSelected = new EventEmitter<string>();

  currentTime = "";

  ngOnInit(): void {
    this.updateTime();
  }

  ngOnChanges() {
    this.updateTime();
    this.setupMessages();
  }

  updateTime() {
    const now = new Date();
    this.currentTime =
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  setupMessages() {
    // this.messages = [
    //   {
    //     headermessage: 'Please select the module for which you want to check the application status:',
    //     subModules: this.Allmessages.subModules
    //   },
    //   {
    //     headermessage: 'Are you satisfied with the response?',
    //     buttons: [
    //       { name: 'Yes', action: () => this.closeServices() },
    //       { name: 'No', action: () => this.closeServices() }
    //     ]
    //   }
    // ];

    this.messages=this.Allmessages
  }

  messages = [];

  closeServices() {
    console.log("Services closed");
  }

  selectStatusModule(module) {
    if (this.moduleName == 'services') {
      let path = (module.id == 7)
        ? module.path
        : `https://webgis2.mpbhulekh.gov.in/#/${module.path}`;
      window.open(`${path}`, "_blank");
    } else {
      this.moduleSelected.emit(module);
    }
  }

}
