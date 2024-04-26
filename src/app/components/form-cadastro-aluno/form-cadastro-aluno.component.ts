import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-cadastro-aluno',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './form-cadastro-aluno.component.html',
  styleUrl: './form-cadastro-aluno.component.scss'
})
export class FormCadastroAlunoComponent {

  public serieOptions: string[] = ['1º ano do ensino médio', '2º ano do ensino médio', '3º ano do ensino médio']

  protected getSerieValue = (serie: string): string => {
    return serie.slice(0, 5)
  }
}
