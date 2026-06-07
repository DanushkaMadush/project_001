import { Injectable, signal } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  path?: string; // optional — last item usually has no link
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  // Signal-based so the component reacts automatically
  private _crumbs = signal<BreadcrumbItem[]>([]);
  readonly crumbs = this._crumbs.asReadonly();

  set(items: BreadcrumbItem[]): void {
    this._crumbs.set(items);
  }

  clear(): void {
    this._crumbs.set([]);
  }
}