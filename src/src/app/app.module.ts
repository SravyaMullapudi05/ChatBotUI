import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HeaderComponent } from './header/header.component';
import { AssistantmodulesModule } from './assistant-modules/assistantmodules.module';
import { ChatModalComponent } from './chat-modal/chat-modal.component';
import { MatMenuModule } from '@angular/material/menu';
// import { ServicesListComponent } from './applicationstatus/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    HeaderComponent,
    ChatModalComponent],
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
    OverlayModule,
    AssistantmodulesModule,
    MatMenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
