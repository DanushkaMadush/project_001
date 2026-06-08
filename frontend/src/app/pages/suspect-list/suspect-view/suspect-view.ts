import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuspectsService } from '../../../services/suspects.service';

@Component({
  selector: 'app-suspect-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './suspect-view.html',
  styleUrl: './suspect-view.scss',
})
export class SuspectViewComponent {
  suspect: any | undefined;
  notFound = false;
  editMode = false;

  private originalSuspect: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suspectsService: SuspectsService
  ) {
    const caseNumber = this.route.snapshot.paramMap.get('id');

    if (!caseNumber) {
      this.notFound = true;
      return;
    }

    const foundSuspect = this.suspectsService.getSuspectByCaseNumber(caseNumber);

    if (!foundSuspect) {
      this.notFound = true;
      return;
    }

    this.suspect = this.cloneSuspect(foundSuspect);
    this.originalSuspect = this.cloneSuspect(foundSuspect);
  }

  backToList(): void {
    this.router.navigate(['dashboard/suspect-list']);
  }

  enableEdit(): void {
    if (!this.suspect) {
      return;
    }

    this.originalSuspect = this.cloneSuspect(this.suspect);
    this.editMode = true;
  }

  cancelEdit(): void {
    if (this.originalSuspect) {
      this.suspect = this.cloneSuspect(this.originalSuspect);
    }

    this.editMode = false;
  }

  saveUpdate(): void {
    if (!this.suspect) {
      return;
    }

    const updated = {
      ...this.suspect,
      UpdatedAt: new Date().toISOString(),
    };
    const saved = this.suspectsService.updateSuspectByCaseNumber(this.suspect.CaseNumber, updated);

    if (saved) {
      console.log('Updated suspect object:', updated);
      this.suspect = this.cloneSuspect(updated);
      this.originalSuspect = this.cloneSuspect(updated);
      this.editMode = false;
    }
  }

  deleteSuspect(): void {
    if (!this.suspect) {
      return;
    }

    const confirmed = confirm(`Delete suspect ${this.suspect.CaseNumber}?`);

    if (!confirmed) {
      return;
    }

    this.suspectsService.deleteSuspectByCaseNumber(this.suspect.CaseNumber);
    this.router.navigate(['dashboard/suspect-list']);
  }

  private cloneSuspect(suspect: any): any {
    return JSON.parse(JSON.stringify(suspect));
  }
}

export { SuspectViewComponent as SuspectView };
