import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  person: User = new User();
  formError: boolean = false;
  errorMessage: string = '';
  registrationSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  isFormValid(form: NgForm): boolean {
    return form.valid ?? false;
  }

  submitForm(signupForm: NgForm) {
    if (!this.isFormValid(signupForm)) {
      this.formError = true;
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.authService.register(this.person).subscribe(
      response => {
        this.registrationSuccess = true;
        signupForm.resetForm();
      },
      error => {
        console.error('Registration error:', error);
        this.formError = true;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }

  redirectToLogin() {
    // Redirection vers la page de connexion
    console.log('Redirecting to login');
    this.router.navigate(['/login']);
  }
}