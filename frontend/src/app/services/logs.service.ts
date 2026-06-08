import { Injectable } from '@angular/core';
import logsData from '../data/logs.json';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private logs: any[] = [...(logsData as any[])].sort((first, second) => {
    return new Date(second.DateTime).getTime() - new Date(first.DateTime).getTime();
  });

  getLogs(): any[] {
    return this.logs;
  }

  getLogById(logId: string): any | undefined {
    return this.logs.find((log) => log.LogId === logId);
  }
}
