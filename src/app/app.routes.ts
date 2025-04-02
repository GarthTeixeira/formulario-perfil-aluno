import { Routes } from '@angular/router';
import { FormAreaSelectorComponent } from './components/form-area-selector-component/form-area-selector-component.component';
import { FormCadatroFormularioComponent } from './components/form-cadastro-formulario/form-cadastro-formulario.component';
import { MainFormComponent } from './components/main-form-component/main-form-component.component';
import { FormDisciplineSelectorComponent } from './components/form-discipline-selector-component/form-discipline-selector-component.component';
import { SelectTypeLoginComponent } from './components/select-type-login/select-type-login.component';
import { SelectFormLoginComponent } from './components/select-form-login/select-form-login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SelectTypeLoginComponent },
  { path: 'selecionar-formulario', component: SelectFormLoginComponent },
  { path: 'cadastro', component: FormCadatroFormularioComponent },
  {
    path: 'areas',
    component: FormAreaSelectorComponent,
    data: { animation: 'areas' },
  },
  {
    path: 'disciplinas',
    component: FormDisciplineSelectorComponent,
    data: { animation: 'disciplinas' },
  },
  {
    path: 'form',
    component: MainFormComponent,
    data: { animation: 'form' },
  },
];
