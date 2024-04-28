
import { FormArray } from "@angular/forms";

export interface competenceFormGroup{
    id:any,
    descricao:any,
    habilidades:FormArray<any> 
}