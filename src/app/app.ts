import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-cypress-demo');

  email = signal('');
  password = signal('');
  errorMessage = signal('');
  successMessage = signal('');

  updateEmail(event: Event) {
    this.email.set((event.target as HTMLInputElement).value);
  }

  updatePassword(event: Event) {
    this.password.set((event.target as HTMLInputElement).value);
  }

  onLogin() {
    this.errorMessage.set('');
    this.successMessage.set('');

    const currentEmail = this.email();
    const currentPassword = this.password();

    if (!currentEmail || !currentPassword) {
      this.errorMessage.set('Vui lòng nhập đầy đủ Email và Mật khẩu');
      return;
    }

    if (currentEmail === 'admin@gmail.com' && currentPassword === '123456') {
      this.successMessage.set('Đăng nhập thành công!');
    } else {
      this.errorMessage.set('Email hoặc mật khẩu không đúng!');
    }
  }
}
