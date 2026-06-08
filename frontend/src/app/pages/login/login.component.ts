import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject } from 'rxjs';

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AppUser {
  id: number;
  username: string;
  password: string;
  role: string;
  displayName: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  showPassword = false;
  isLoading    = false;
  serverError  = '';
  isDarkMode   = false;

  // ─── Hardcoded users ─────────────────────────────────────────
  private readonly USERS: AppUser[] = [
    {
      id:          1,
      username:    'admin',
      password:    'admin@1234',
      role:        'Admin',
      displayName: 'System Admin',
    },
    {
      id:          2,
      username:    'officer',
      password:    'officer@1234',
      role:        'Officer',
      displayName: 'Field Officer',
    },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb:     FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark-theme');
    }
  }

  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Form Setup ──────────────────────────────────────────────

  private buildForm(): void {
    this.loginForm = this.fb.group({
      email:      ['', [Validators.required]],
      password:   ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  // ─── Getters ─────────────────────────────────────────────────

  get emailControl(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  // ─── Validation Helpers ──────────────────────────────────────

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getEmailError(): string {
    if (this.emailControl.hasError('required')) return 'Username is required';
    return '';
  }

  // ─── Actions ─────────────────────────────────────────────────

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading   = true;
    this.serverError = '';

    const enteredUsername = this.emailControl.value.trim().toLowerCase();
    const enteredPassword = this.passwordControl.value.trim();

    try {
      const isValidUser = this.login();

      if (isValidUser) {
        if(enteredUsername == 'admin'){
          this.router.navigate(['dashboard/home']);
        }else{
          this.router.navigate(['dashboard/home2']);
        }
        
      } else {
        this.serverError = 'Invalid username or password';
      }
    } catch (error) {
      this.serverError = 'Something went wrong. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  // ─── Login Logic ─────────────────────────────────────────────

  login(): boolean {
    const enteredUsername = this.emailControl.value.trim().toLowerCase();
    const enteredPassword = this.passwordControl.value.trim();

    const user = this.USERS.find(
      u => u.username.toLowerCase() === enteredUsername &&
           u.password               === enteredPassword
    );

    if (user) {
      const { password, ...safeUser } = user;
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      return true;
    }

    return false;
  }
}