import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-form-competencias-cognitivas',
  standalone: true,
  imports: [MatIcon, MatIconModule, MatButtonModule],
  templateUrl: './form-competencias-cognitivas.component.html',
  styleUrl: './form-competencias-cognitivas.component.scss'
})
export class FormCompetenciasCognitivasComponent {

  fileName = '';

  fileChanged(event: any){
    const files = event.target.files;
    if (files){
      this.fileName = files[0].name;
      console.log(files);
    } else {
      
    }
  }
}
