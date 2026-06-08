import { Injectable } from '@angular/core';
import suspectsData from '../data/suspects.json';

@Injectable({
  providedIn: 'root',
})
export class SuspectsService {
  private suspects: any[] = [...(suspectsData as any[])];

  getSuspects(): any[] {
    return this.suspects;
  }

  getSuspectByCaseNumber(caseNumber: string): any | undefined {
    return this.suspects.find((suspect) => suspect.CaseNumber === caseNumber);
  }

  deleteSuspectByCaseNumber(caseNumber: string): boolean {
    const initialLength = this.suspects.length;
    this.suspects = this.suspects.filter((suspect) => suspect.CaseNumber !== caseNumber);

    return this.suspects.length !== initialLength;
  }

  updateSuspectByCaseNumber(caseNumber: string, updatedSuspect: any): boolean {
    const suspectIndex = this.suspects.findIndex((suspect) => suspect.CaseNumber === caseNumber);

    if (suspectIndex === -1) {
      return false;
    }

    this.suspects[suspectIndex] = {
      ...this.suspects[suspectIndex],
      ...updatedSuspect,
      CaseNumber: caseNumber,
    };

    return true;
  }
}
