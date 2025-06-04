declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: '463010079498-0t9fic8r2fhkmargls1etkeggurem6kt.apps.googleusercontent.com',
          callback: (response: any) => this.handleLogin(response)
        });
        google.accounts.id.renderButton(
          document.getElementById('signInButton') as HTMLElement,
          { theme: 'outline', size: 'large', shape: 'rectangular', width: 250 }
        );
      } else {
        console.error('Google API not loaded yet.');
      }
    }, 1000);
  }

  private handleLogin(response: any) {
    if (response?.credential) {
      const payload = this.decodedToken(response.credential);
      sessionStorage.setItem('LoggedInUser', JSON.stringify(payload));
      this.router.navigate(['/profiles']);
    } else {
      console.error('No credential returned from Google');
    }
  }

  private decodedToken(token: string): any {
    // JWT is three parts separated by dots; payload is the 2nd
    const base64Payload = token.split('.')[1];
    const jsonPayload = atob(base64Payload);
    return JSON.parse(jsonPayload);
  }
}
