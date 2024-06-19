import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service'; 


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) { } 

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => { 
      this.isLoggedIn = loggedIn;
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  redirectToHome() {
    this.router.navigate(['']);
  }

  redirectToCheckout() {
    this.router.navigate(['cart']);
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      alert('Logout successful');
    });
  }
}

