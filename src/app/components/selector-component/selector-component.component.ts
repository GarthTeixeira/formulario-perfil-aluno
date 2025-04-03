import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecodeUTF8Pipe } from '../../pipes/decode-utf8.pipe';
import { Disciplina, Register } from '../../types/serviceTypes';
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

  isTooltipVisible = false;
  tooltipContent: string | undefined = '';
  tooltipPosition = { x: 0, y: 0 };

  isAnswered(
    item: DisciplinaSelectItem | AreasSelectItem
  ): item is DisciplinaSelectItem & {
    lastRegister: NonNullable<DisciplinaSelectItem['lastRegister']>;
  } {
    return (
      'lastRegister' in item &&
      item.lastRegister !== undefined &&
      item.lastRegister !== null
    );
  }

  showTooltip(event: MouseEvent, item: DisciplinaSelectItem | AreasSelectItem) {
    try {
      this.isTooltipVisible = this.evaluateTooltipVisibility(event, item);
    } catch (error) {
      console.error('Erro ao exibir tooltip:', error);
      this.isTooltipVisible = false;
    }
  }

  hideTooltip() {
    this.isTooltipVisible = false;
  }

  evaluateTooltipVisibility(
    event: MouseEvent,
    item: DisciplinaSelectItem | AreasSelectItem
  ): boolean {
    if (!this.isAnswered(item)) {
      this.isTooltipVisible = false;
      return false;
    }

    const formattedDate = this.lastAwnserRegisterPT(item.lastRegister);
    if (!formattedDate) throw new Error('Formatação de data falhou');

    this.tooltipContent = formattedDate;
    this.tooltipPosition = {
      x: event.clientX + 10,
      y: event.clientY + 10,
    };
    return true;
  }

  lastAwnserRegisterPT({ ultima_resposta, professor }: Register) {
    const data = new Date(ultima_resposta);
    const opcoes: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
      timeZoneName: 'short',
    };

    return (
      'Última resposta de ' +
      professor +
      ' em ' +
      data.toLocaleDateString('pt-BR', opcoes) +
      ' às ' +
      data.toLocaleTimeString('pt-BR')
    );
  }
}
