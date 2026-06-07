import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from '../../layout/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-activity-log-view',
  imports: [CommonModule, Breadcrumb],
  templateUrl: './activity-log-view.component.html',
  styleUrl: './activity-log-view.component.scss',
})
export class ActivityLogViewComponent {
  log: any | undefined;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logsService: LogsService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.set([
      { label: 'Home', path: '/home' },
      { label: 'Activity Log', path: '/activity-log' },
      { label: 'Log Details' },
    ]);

    const logId = this.route.snapshot.paramMap.get('id');

    if (!logId) {
      this.notFound = true;
      return;
    }

    this.log = this.logsService.getLogById(logId);
    this.notFound = !this.log;
  }

  backToLogs(): void {
    this.router.navigate(['/activity-log']);
  }

  badgeClass(value: string): string {
    const normalized = value?.toLowerCase() || '';

    if (normalized === 'success') return 'badge-success';
    if (normalized === 'failed') return 'badge-failed';
    if (normalized === 'warning') return 'badge-warning';
    if (normalized === 'info') return 'badge-info';

    return 'badge-info';
  }
}
