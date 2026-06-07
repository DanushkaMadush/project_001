import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../layout/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-activity-log',
  imports: [CommonModule, Breadcrumb],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent {
  logs: any[] = [];
  filteredLogs: any[] = [];

  actionTypes: string[] = [];
  statuses: string[] = [];
  severities: string[] = [];
  userRoles: string[] = [];

  searchText = '';
  selectedActionType = '';
  selectedStatus = '';
  selectedSeverity = '';
  selectedUserRole = '';

  constructor(
    private logsService: LogsService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set([
      { label: 'Home', path: '/home' },
      { label: 'Activity Log' },
    ]);

    this.logs = this.logsService.getLogs();
    this.actionTypes = this.getUniqueValues('ActionType');
    this.statuses = this.getUniqueValues('Status');
    this.severities = this.getUniqueValues('Severity');
    this.userRoles = this.getUniqueValues('UserRole');
    this.applyFilters();
  }

  search(value: string): void {
    this.searchText = value;
    this.applyFilters();
  }

  filterByActionType(value: string): void {
    this.selectedActionType = value;
    this.applyFilters();
  }

  filterByStatus(value: string): void {
    this.selectedStatus = value;
    this.applyFilters();
  }

  filterBySeverity(value: string): void {
    this.selectedSeverity = value;
    this.applyFilters();
  }

  filterByUserRole(value: string): void {
    this.selectedUserRole = value;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedActionType = '';
    this.selectedStatus = '';
    this.selectedSeverity = '';
    this.selectedUserRole = '';
    this.applyFilters();
  }

  viewLog(logId: string): void {
    this.router.navigate(['/activity-log', logId]);
  }

  statusClass(value: string): string {
    return this.badgeClass(value);
  }

  severityClass(value: string): string {
    return this.badgeClass(value);
  }

  trackByLogId(index: number, log: any): string {
    return log.LogId;
  }

  private applyFilters(): void {
    const term = this.searchText.toLowerCase().trim();

    this.filteredLogs = this.logs.filter((log) => {
      const searchableText = [
        log.Action,
        log.Username,
        log.UserId,
        log.EntityId,
        log.IpAddress,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = !term || searchableText.includes(term);
      const matchesActionType = !this.selectedActionType || log.ActionType === this.selectedActionType;
      const matchesStatus = !this.selectedStatus || log.Status === this.selectedStatus;
      const matchesSeverity = !this.selectedSeverity || log.Severity === this.selectedSeverity;
      const matchesUserRole = !this.selectedUserRole || log.UserRole === this.selectedUserRole;

      return matchesSearch && matchesActionType && matchesStatus && matchesSeverity && matchesUserRole;
    });
  }

  private getUniqueValues(key: string): string[] {
    return Array.from(
      new Set(
        this.logs
          .map((log) => log[key])
          .filter((value): value is string => Boolean(value))
      )
    ).sort((first, second) => first.localeCompare(second));
  }

  private badgeClass(value: string): string {
    const normalized = value?.toLowerCase() || '';

    if (normalized === 'success') return 'badge-success';
    if (normalized === 'failed') return 'badge-failed';
    if (normalized === 'warning') return 'badge-warning';
    if (normalized === 'info') return 'badge-info';

    return 'badge-info';
  }
}
