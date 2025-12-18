// src/app/assistant/assistantmodule.routes.ts
import { Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const ASSISTANT_ROUTES: Routes = [
    {
        path: 'contactus',
        component: ContactUsComponent
    }
];
