import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../layout/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb';

interface ReportPreviewRow {
  referenceNo: string;
  description: string;
  category: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  reportTypes = [
    'Suspect Summary Report',
    'Suspect History Report',
    'Activity Log Report',
    'User Activity Report',
    'Closed Cases Report',
    'Narcotic Offence Report',
  ];

  selectedReportType = '';
  fromDate = '';
  toDate = '';
  submitted = false;
  previewVisible = false;
  previewRows: ReportPreviewRow[] = [];

  private mockRows: ReportPreviewRow[] = [
    {
      referenceNo: 'NCB-2025-0001',
      description: 'Suspect profile summary prepared for review',
      category: 'Suspect',
      status: 'Active',
      date: '2026-06-01',
    },
    {
      referenceNo: 'LOG-2026-0047',
      description: 'Failed login attempt included in audit extract',
      category: 'Activity',
      status: 'Warning',
      date: '2026-06-07',
    },
    {
      referenceNo: 'NCB-2025-0012',
      description: 'Closed case details prepared for reporting',
      category: 'Case',
      status: 'Closed',
      date: '2026-05-24',
    },
  ];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.set([
      { label: 'Home', path: '/home' },
      { label: 'Reports' },
    ]);
  }

  get hasDateRangeError(): boolean {
    return Boolean(this.fromDate && this.toDate && this.fromDate > this.toDate);
  }

  get hasReportTypeError(): boolean {
    return this.submitted && !this.selectedReportType;
  }

  generatePreview(): void {
    this.submitted = true;

    if (!this.selectedReportType || this.hasDateRangeError) {
      this.previewVisible = false;
      return;
    }

    this.previewRows = this.mockRows;
    this.previewVisible = true;
  }

  statusClass(status: string): string {
    const normalized = status.toLowerCase();

    if (normalized.includes('closed') || normalized.includes('success')) return 'badge-success';
    if (normalized.includes('warning') || normalized.includes('progress')) return 'badge-warning';
    if (normalized.includes('failed') || normalized.includes('active')) return 'badge-alert';

    return 'badge-info';
  }
}
