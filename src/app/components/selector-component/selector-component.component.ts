import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecodeUTF8Pipe } from '../../pipes/decode-utf8.pipe';
import { Disciplina } from '../../types/serviceTypes';
import {
  AreasSelectItem,
  DisciplinaSelectItem,
} from '../../types/componentsTypes';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-selector-component',
  standalone: true,
  imports: [RouterModule, NgClass, DecodeUTF8Pipe, MatIconModule],
  templateUrl: './selector-component.component.html',
  styleUrl: './selector-component.component.scss',
})
export class SelectorComponent {
  @Input() public items: Array<DisciplinaSelectItem | AreasSelectItem> = [];
  @Input() public destinyRoute: string = '';

  isAnswered(item: DisciplinaSelectItem | AreasSelectItem): boolean {
    return 'answered' in item && item.answered;
  }
}
