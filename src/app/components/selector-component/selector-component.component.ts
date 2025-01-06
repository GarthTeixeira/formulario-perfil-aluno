import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecodeUTF8Pipe } from '../../pipes/decode-utf8.pipe';
import { Disciplina } from '../../types/serviceTypes';

@Component({
  selector: 'app-selector-component',
  standalone: true,
  imports: [RouterModule, NgClass, DecodeUTF8Pipe],
  templateUrl: './selector-component.component.html',
  styleUrl: './selector-component.component.scss'
})
export class SelectorComponent {
@Input() public items:Array<any> = [];
@Input() public destinyRoute:string = '';
}
