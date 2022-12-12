import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { IAddAuthor } from '../../../authors/interfaces/add-author.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

  public dialogForm!: FormGroup;

  constructor(
    private readonly _dialogRef: MatDialogRef<DialogComponent>,
    private readonly _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IAddAuthor,
  ) {
    this.dialogForm = this._initForm();
  }

  public get firstName(): FormControl {
    return this.dialogForm.get('firstName') as FormControl;
  }

  public get lastName(): FormControl {
    return this.dialogForm.get('lastName') as FormControl;
  }

  public onNoClick(): void {
    this._dialogRef.close();
  }

  public addAuthor(): void {
    this._dialogRef.close({ first_name: this.firstName.value, last_name: this.lastName.value });
  }

  private _initForm(): FormGroup {
    return this._formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }

}
