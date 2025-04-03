import { Component, OnInit } from '@angular/core';
import { SelectorComponent } from '../selector-component/selector-component.component';
import { RouterLink } from '@angular/router';
import { DisciplinasService } from '../../services/disciplinas.service';
import { DisciplinaSelectItem } from '../../types/componentsTypes';
import { Disciplina, TypeDisciplinaRegister } from '../../types/serviceTypes';
import { FormProfessoresService } from '../../services/form-professores.service';
import { forkJoin } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { getTituloFormatoDisciplinaNomeSerie } from '../../utils/professor-form-utils';

@Component({
  selector: 'app-form-discipline-selector-component',
  standalone: true,
  imports: [SelectorComponent, RouterLink],
  templateUrl: './form-discipline-selector-component.component.html',
  styleUrl: './form-discipline-selector-component.component.scss',
})
export class FormDisciplineSelectorComponent {
  disciplinas: Array<DisciplinaSelectItem> = [];

  areaSelecionada: string = '';

  color: string = '';

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

    forkJoin([getDiscipinasArea, getDisciplinaRegister]).subscribe(
      ([disciplinas, professoreRegisters]) => {
        console.log(professoreRegisters);
        this.disciplinas = disciplinas
          .filter((disciplina: Disciplina) => disciplina.serie_ano <= 3)
          .map((disciplina: Disciplina) => {
            const title = getTituloFormatoDisciplinaNomeSerie(disciplina);
            return {
              title,
              id: disciplina.id,
              tag: disciplina.area,
              color: this.color,
              answered: this.isAnswered(disciplina.id, professoreRegisters),
            };
          });
      }
    );
  }

  //NOTE: estava selecionando o registro pelo nome antes, porque?
  isAnswered(
    disciplinaId: string,
    professoreRegisters: TypeDisciplinaRegister[]
  ): boolean {
    return professoreRegisters.some((profReg) => profReg.id === disciplinaId);
  }

  ngOnInit() {
    this.areaSelecionada = history.state.itemData.tag;
    this.color = history.state.itemData.color;

    this.getDisciplinas();
  }
}
