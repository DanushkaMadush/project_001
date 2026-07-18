import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
   isDark = false;
   user  : string = '';

 
  ngOnInit(): void {
    // 1. Check if user has previously set a preference
    const saved = localStorage.getItem('theme');
    this.user = localStorage.getItem('currentUser')?.toString() ?? 'Admin';
 
    if (saved) {
      this.isDark = saved === 'dark';
    } else {
      // 2. Fall back to OS/system preference
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
 
    this.applyTheme();
 
    // 3. Listen for OS theme changes (only when no manual preference is saved)
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.isDark = e.matches;
          this.applyTheme();
        }
      });
  }
 
  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }
 
  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }
}
