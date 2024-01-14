// settings-modal.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsModalComponent } from '../pages/user/settings-modal/settings-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SettingsModalService {
  constructor(private dialog: MatDialog) {}

  openSettingsModal() {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Settings modal closed');
    });
  }
}
