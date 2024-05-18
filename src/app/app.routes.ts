import { Routes } from '@angular/router';
import { FormAreaSelectorComponent } from './components/form-area-selector-component/form-area-selector-component.component';
import { FormCadastroAlunoComponent } from './components/form-cadastro-aluno/form-cadastro-aluno.component';
import { MainFormComponent } from './components/main-form-component/main-form-component.component';
import { FormDisciplineSelectorComponent } from './components/form-discipline-selector-component/form-discipline-selector-component.component';
import { FormCompetenciasCognitivasComponent } from './components/form-competencias-cognitivas/form-competencias-cognitivas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: FormCadastroAlunoComponent },
    { path: 'areas', component: FormAreaSelectorComponent, data: { animation: 'areas' }},
    { path: 'disciplinas', component: FormDisciplineSelectorComponent,  data: { animation: 'disciplinas' }},
    {
        path: 'form',
        component: MainFormComponent,
        data: { animation: 'form' }
    },
    {
        path: 'competencias-cognitivas',
        component: FormCompetenciasCognitivasComponent,
        data: { animation: 'competencias-cognitivas' }
    }
];
