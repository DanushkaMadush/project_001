import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface AdminStats {
  totalSuspects: number;
  systemUsers: number;
  newThisMonth: number;
  casesClosed: number;
  totalRoles: number;
}

interface ActivityItem {
  type: 'new' | 'update' | 'closed' | 'admin';
  title: string;
  sub: string;
  time: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  /* ── Admin info ── */
  adminName      = 'Admin Silva';
  adminFirstName = 'Silva';

  /* ── Live clock ── */
  liveTime = '';
  private clockInterval: ReturnType<typeof setInterval> | null = null;

  /* ── Greeting ── */
  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  /* ── Current month label ── */
  get currentMonth(): string {
    return new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  /* ── Stats (replace with real service calls) ── */
  stats: AdminStats = {
    totalSuspects: 1284,
    systemUsers:   18,
    newThisMonth:  12,
    casesClosed:   319,
    totalRoles:    4
  };

  /* ── Recent activity (replace with real service call) ── */
  recentActivity: ActivityItem[] = [
    {
      type:  'admin',
      title: 'New user added — P.C. Rathnayake',
      sub:   'Added by Admin Silva · Officer account created',
      time:  '10:02'
    },
    {
      type:  'admin',
      title: 'Role updated — Senior Officer',
      sub:   'Permissions modified by Admin Silva',
      time:  '09:44'
    },
    {
      type:  'new',
      title: 'New suspect profile — Kamal Perera',
      sub:   'Case #2026-0412 · Added by P.C. Fernando',
      time:  '09:14'
    },
    {
      type:  'update',
      title: 'Profile updated — Nimal Jayasinghe',
      sub:   'Case #2026-0388 · Address and contact revised',
      time:  '08:47'
    },
    {
      type:  'closed',
      title: 'Case closed — Suresh Mendis',
      sub:   'Case #2026-0301 · Court verdict recorded',
      time:  'Yesterday'
    }
  ];

  ngOnInit(): void {
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }

  private updateClock(): void {
    const now    = new Date();
    const days   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
                    'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    const day   = days[now.getDay()];
    const date  = now.getDate();
    const month = months[now.getMonth()];
    const year  = now.getFullYear();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    this.liveTime = `${day} ${date} ${month} ${year}   ·   ${h}:${m}:${s}`;
  }
}