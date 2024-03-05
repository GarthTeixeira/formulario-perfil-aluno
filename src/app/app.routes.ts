import { Routes } from '@angular/router';
import { FormAreaSelectorComponent } from './components/form-area-selector-component/form-area-selector-component.component';
import { MainFormComponent } from './components/main-form-component/main-form-component.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: FormAreaSelectorComponent },
    {
        path: 'form/:tag',
        component: MainFormComponent,
    }
];
