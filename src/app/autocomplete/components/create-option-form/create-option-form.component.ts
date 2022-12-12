import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { IAddAuthor } from '../../../authors/interfaces/add-author.interface';

@Component({
  selector: 'app-create-option-form',
  templateUrl: './create-option-form.component.html',
  styleUrls: ['./create-option-form.component.scss'],
})
export class CreateOptionFormComponent {

  @Output()
  public saveOption = new EventEmitter<IAddAuthor>();

  public readonly addOptionForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.addOptionForm = this._initForm();
  }

  public get inputFirstName(): FormControl {
    return this.addOptionForm.get('inputFirstName') as FormControl;
  }

  public get inputLastName() : FormControl {
    return this.addOptionForm.get('inputLastName') as FormControl;
  }

  public emitValue(): void {

    this.saveOption.emit(
      {
        first_name: this.inputFirstName.value,
        last_name: this.inputLastName.value,
      },
    );
  }

  private _initForm(): FormGroup {
    return this._formBuilder.group(
      {
        inputFirstName: [''],
        inputLastName: [''],
      },
    );
  }

}
