import { CommonModule } from '@angular/common';
import {
  EventEmitter,
  Component,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Observable, catchError, of } from 'rxjs';
import { DecodeUTF8Pipe } from '../../pipes/decode-utf8.pipe';

@Component({
  selector: 'app-loading-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DecodeUTF8Pipe,
  ],
  templateUrl: './loading-form-field.component.html',
  styleUrl: './loading-form-field.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoadingFormFieldComponent {
  @Input() public control!: FormControl;

  @Input() public fetchData: Observable<any> | null = null;

  @Input() public itemsOptions: any[] = [];

  @Output() selectionChange = new EventEmitter<any>();

  public errorLoadingItems: boolean = false;

  public loadingData: Observable<any> | null | undefined = null;

  @Input() icon = 'arrow_drop_down';

  @Input() label = 'Selecione';
  @Input() optionDisplayField = 'nome';

  ngOnInit() {
    this.loadingData = this.fetchData?.pipe(
      catchError((error) => {
        this.errorLoadingItems = true;
        console.error(
          `Erro ao carregar entidade '${this.label.toLocaleLowerCase()}':`,
          error
        );
        return of([]);
      })
    );

    this.loadingData?.subscribe((response) => {
      this.itemsOptions = response;
    });
  }

  onSelectionChange(event: any) {
    this.selectionChange.emit(event);
  }
}
