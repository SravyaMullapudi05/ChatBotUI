import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [],
   imports: [
      BrowserModule,
      AppRoutingModule,
      MatIconModule,
      MatTooltipModule,
      MatButtonModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatSidenavModule,
      MatDialogModule,
      FormsModule,
      OverlayModule]
})
export class AssistantmodulesModule { }
