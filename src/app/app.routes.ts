import { Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';

export const routes: Routes = [

  {
    path: 'home',
    component: HomeScreenComponent
  },
  {
    path: 'assistant',
    canMatch: [() => false],
    loadChildren: () =>
      import('./assistant-modules/assistant.routes')
        .then(m => m.ASSISTANT_ROUTES)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
