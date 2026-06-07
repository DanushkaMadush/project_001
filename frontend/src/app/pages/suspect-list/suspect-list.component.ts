import { Component } from '@angular/core';
import { SuspectsService } from '../../services/suspects.service';
import { SuspectCard } from "./suspect-card/suspect-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suspect-list',
  imports: [SuspectCard, CommonModule],
  templateUrl: './suspect-list.component.html',
  styleUrl: './suspect-list.component.scss'
})
export class SuspectListComponent {
  suspects: any[] = [];
  filteredSuspects: any[] = [];

  searchText = '';

  constructor(private suspectsService: SuspectsService) {}

  ngOnInit(): void {
    this.suspects = this.suspectsService.getSuspects();
    this.filteredSuspects = this.suspects;
  }

  search(value: string): void {
    this.searchText = value;

    const term = value.toLowerCase().trim();

    if (!term) {
      this.filteredSuspects = this.suspects;
      return;
    }

    this.filteredSuspects = this.suspects.filter((suspect) =>
      suspect['Full Name']?.toLowerCase().includes(term) ||
      suspect['Case Number']?.toLowerCase().includes(term) ||
      suspect.NIC?.toLowerCase().includes(term) ||
      suspect.PassportNumber?.toLowerCase().includes(term) ||
      suspect.Alias?.toLowerCase().includes(term) ||
      suspect['offence type']?.toLowerCase().includes(term) ||
      suspect['police station']?.toLowerCase().includes(term)
    );
  }

  trackByCaseNumber(index: number, suspect: any): string {
    return suspect['Case Number'];
  }
}
