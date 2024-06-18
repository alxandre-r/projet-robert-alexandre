import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  connection() {
    this.authService.login(this.login, this.password).subscribe(
      (response) => {
        this.authService.setJwtToken(response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  redirectToSignUp() {
    this.router.navigate(['./signup']);
  }
}
