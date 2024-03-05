import { Routes } from '@angular/router';
import { FormAreaSelectorComponent } from './components/form-area-selector-component/form-area-selector-component.component';
import { MainFormComponent } from './components/main-form-component/main-form-component.component';
import { FormDisciplineSelectorComponent } from './components/form-discipline-selector-component/form-discipline-selector-component.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: FormAreaSelectorComponent },
    { path: 'disciplinas', component: FormDisciplineSelectorComponent,  data: { animation: 'disciplinas' }},
    {
        path: 'form',
        component: MainFormComponent,
        data: { animation: 'form' }
    }
];
