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
  offenceTypes: string[] = [];
  policeStations: string[] = [];

  searchText = '';
  selectedOffenceType = '';
  selectedPoliceStation = '';
  selectedDate = '';

  constructor(private suspectsService: SuspectsService) {}

  ngOnInit(): void {
    this.suspects = this.suspectsService.getSuspects();
    this.offenceTypes = this.getUniqueValues('OffenceType');
    this.policeStations = this.getUniqueValues('PoliceStation');
    this.applyFilters();
  }

  search(value: string): void {
    this.searchText = value;
    this.applyFilters();
  }

  filterByOffenceType(value: string): void {
    this.selectedOffenceType = value;
    this.applyFilters();
  }

  filterByPoliceStation(value: string): void {
    this.selectedPoliceStation = value;
    this.applyFilters();
  }

  filterByDate(value: string): void {
    this.selectedDate = value;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedOffenceType = '';
    this.selectedPoliceStation = '';
    this.selectedDate = '';
    this.applyFilters();
  }

  private applyFilters(): void {
    const term = this.searchText.toLowerCase().trim();

    this.filteredSuspects = this.suspects.filter((suspect) => {
      const searchableText = [
        suspect.FullName,
        suspect.CaseNumber,
        suspect.NIC,
        suspect.PassportNumber,
        suspect.Alias,
        suspect.OffenceType,
        suspect.PoliceStation,
        suspect.RecordingOfficer,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = !term || searchableText.includes(term);
      const matchesOffence =
        !this.selectedOffenceType || suspect.OffenceType === this.selectedOffenceType;
      const matchesStation =
        !this.selectedPoliceStation || suspect.PoliceStation === this.selectedPoliceStation;
      const matchesDate =
        !this.selectedDate || suspect.DateRecorded === this.selectedDate;

      return matchesSearch && matchesOffence && matchesStation && matchesDate;
    });
  }

  private getUniqueValues(key: string): string[] {
    return Array.from(
      new Set(
        this.suspects
          .map((suspect) => suspect[key])
          .filter((value): value is string => Boolean(value))
      )
    ).sort((first, second) => first.localeCompare(second));
  }

  trackByCaseNumber(index: number, suspect: any): string {
    return suspect.CaseNumber;
  }
}
