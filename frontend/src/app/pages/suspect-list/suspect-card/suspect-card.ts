import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suspect-card',
  imports: [CommonModule],
  templateUrl: './suspect-card.html',
  styleUrl: './suspect-card.scss',
})
export class SuspectCard {
  @Input() suspect: any;

  get statusClass(): string {
    const status = this.suspect?.Status?.toLowerCase() || '';

    if (status.includes('active') || status.includes('investigation')) return 'status-active';
    if (status.includes('closed') || status.includes('convicted')) return 'status-closed';
    if (status.includes('charged') || status.includes('new')) return 'status-alert';

    return 'status-default';
  }
}
