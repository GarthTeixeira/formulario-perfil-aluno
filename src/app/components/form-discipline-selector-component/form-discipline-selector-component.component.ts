import { Component, OnInit } from '@angular/core';
import { SelectorComponent } from '../selector-component/selector-component.component';
import { RouterLink } from '@angular/router';
import { DisciplinasService } from '../../services/disciplinas.service';
import { DisciplinaSelectItem } from '../../types/componentsTypes';
import {
  Disciplina,
  Register,
  TypeDisciplinaRegister,
} from '../../types/serviceTypes';
import { FormProfessoresService } from '../../services/form-professores.service';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { getTituloFormatoDisciplinaNomeSerie } from '../../utils/professor-form-utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-discipline-selector-component',
  standalone: true,
  imports: [
    CommonModule,
    SelectorComponent,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form-discipline-selector-component.component.html',
  styleUrl: './form-discipline-selector-component.component.scss',
})
export class FormDisciplineSelectorComponent {
  disciplinas: Array<DisciplinaSelectItem> = [];

  areaSelecionada: string = '';

  color: string = '';

  loadDisciplinas: Observable<any> = new Observable();

  errorLoadingItems: boolean = false;

  constructor(
    private disciplinasService: DisciplinasService,
    private formProfessorService: FormProfessoresService,
    private localStorageService: LocalStorageService
  ) {}

  getDisciplinas() {
    const getDiscipinasArea = this.disciplinasService.getByAreaWithActualSerie(
      this.areaSelecionada
    );
    const getDisciplinaRegister =
      this.formProfessorService.getDisciplinaRegister(
        this.localStorageService.getItem('userData')['id']
      );

    this.loadDisciplinas = forkJoin([
      getDiscipinasArea,
      getDisciplinaRegister,
    ]).pipe(
      catchError((error) => {
        this.errorLoadingItems = true;
        console.error(`Erro ao carregar entidade disciplinas:`, error);
        return of([]);
      })
    );

    this.loadDisciplinas.subscribe(([disciplinas, registersByDisciplina]) => {
      this.disciplinas = disciplinas
        .filter((disciplina: Disciplina) => disciplina.serie_ano <= 3)
        .map((disciplina: Disciplina) => {
          const title = getTituloFormatoDisciplinaNomeSerie(disciplina);
          const essencial = {
            title,
            id: disciplina.id,
            tag: disciplina.area,
            color: this.color,
          };
          const lastRegister = this.getLastRegister(
            disciplina.id,
            registersByDisciplina
          );
          return !lastRegister ? essencial : { ...essencial, lastRegister };
        });
    });
  }

  //NOTE: estava selecionando o registro pelo nome antes, porque?
  getLastRegister(
    disciplinaId: string,
    registersByDisciplina: TypeDisciplinaRegister[]
  ): Register | null {
    const registers = registersByDisciplina.find(
      (r) => r.id === disciplinaId
    )?.register;

    if (!registers?.length) return null;

    return registers.reduce((latest, current) =>
      new Date(current.ultima_resposta).getTime() >
      new Date(latest.ultima_resposta).getTime()
        ? current
        : latest
    );
  }

  ngOnInit() {
    this.areaSelecionada = history.state.itemData.tag;
    this.color = history.state.itemData.color;

    this.getDisciplinas();
  }
}
