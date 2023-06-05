import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
  })
  export class ConfirmDialog {

    @Input() textContent!: string;
    @Input() textCancelButton!: string;
    @Input() textConfirmButton!: string;

    constructor() { }

  }