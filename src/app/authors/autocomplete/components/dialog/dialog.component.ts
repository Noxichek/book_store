import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

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
  ) {
    this.dialogForm = this._initForm();
  }

  public get firstName(): AbstractControl | null {
    return this.dialogForm.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.dialogForm.get('lastName');
  }

  public cancel(): void {
    this._dialogRef.close();
  }

  public addAuthor(): void {
    this._dialogRef.close({ first_name: this.firstName?.value, last_name: this.lastName?.value });
  }

  private _initForm(): FormGroup {
    return this._formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }

}
