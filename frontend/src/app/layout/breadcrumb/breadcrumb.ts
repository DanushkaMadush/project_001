import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
    protected bc = inject(BreadcrumbService);
}
