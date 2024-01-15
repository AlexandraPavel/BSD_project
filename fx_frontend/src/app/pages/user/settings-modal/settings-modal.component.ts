// settings-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css'],
})
export class SettingsModalComponent {
  @Input() username: any; email: any;
  @Output() close = new EventEmitter<void>();

  constructor(private dialogRef: MatDialogRef<SettingsModalComponent>) {}

  ngOnInit(): void {
    // Fetch userDetails from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername) {
      this.username = storedUsername;
      this.email = storedEmail;
    }
  }
  showContent = true;
  contentType: 'accountDetails' | 'currencyOptions' | 'deleteAccount' = 'accountDetails';

  showAccountDetails() {
    this.contentType = 'accountDetails';
    this.showContent = true;
  }

  showCurrencyOptions() {
    this.contentType = 'currencyOptions';
    this.showContent = true;
  }

  deleteAccount() {
    this.contentType = 'deleteAccount';
    // Additional logic for delete functionality
  }

  closeModal() {
    this.dialogRef.close();
  }
}
