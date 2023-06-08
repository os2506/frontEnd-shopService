import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../user.service';
import { NgFor } from '@angular/common';

export interface UpdateUserDialogData {
  id: number,
  city: string;
  email: string;
  postalCode: string;
  roles: string[];
  state: string;
}

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, NgFor, MatSelectModule],
})

export class UpdateUserDialogComponent {

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateUserDialogData
  ) { }

  rolesList: string[] = ['ADMIN', 'USER'];

  ngOnInit(): void {

    var rolesInit: any[] = [];

    this.data.roles.forEach((role: any) => {
      rolesInit.push(role.roleName);
    })
    
    this.data.roles = rolesInit;
  }

  async onClickUpdate(data: UpdateUserDialogData): Promise<void> {
    await lastValueFrom(this.userService.update(data.id, data)).catch((err) => {
      console.log("An error occured on updating")
    })
    .then(response => {
      this.dialogRef.close(response);
    });
  }

}
