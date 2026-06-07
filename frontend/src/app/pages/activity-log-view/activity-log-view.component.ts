import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-activity-log-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-log-view.component.html',
  styleUrl: './activity-log-view.component.scss',
})
export class ActivityLogViewComponent {
  log: any | undefined;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logsService: LogsService
  ) {
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
