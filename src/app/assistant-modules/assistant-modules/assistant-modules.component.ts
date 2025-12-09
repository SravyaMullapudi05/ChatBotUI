import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-assistant-modules',
  templateUrl: './assistant-modules.component.html',
  styleUrls: ['./assistant-modules.component.css']
})
export class AssistantModulesComponent {

  @Input() modules: string[] = [];

  @Output() moduleSelected = new EventEmitter<string>();
  @Output() applicationEntered = new EventEmitter<string>();

  awaitingNumber = false;

  onModuleClick(module: string) {
    this.awaitingNumber = true;
    this.moduleSelected.emit(module);
  }
}
