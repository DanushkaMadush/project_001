import { Injectable } from '@angular/core';
import suspectsData from '../data/suspects.json';

@Injectable({
  providedIn: 'root',
})
export class SuspectsService {

  getSuspects(): any[] {
    return suspectsData as any[];
  }
  
}
