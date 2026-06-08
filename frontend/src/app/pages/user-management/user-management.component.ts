import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [
    {
      id: 'USR-001',
      name: 'Adrian Cole',
      email: 'adrian.cole@dept.gov',
      role: 'Analyst',
      status: 'active',
      createdAt: new Date('2024-11-01'),
    },
    {
      id: 'USR-002',
      name: 'Maya Reyes',
      email: 'm.reyes@dept.gov',
      role: 'Supervisor',
      status: 'active',
      createdAt: new Date('2024-10-15'),
    },
    {
      id: 'USR-003',
      name: 'Nathan Obi',
      email: 'n.obi@dept.gov',
      role: 'Viewer',
      status: 'inactive',
      createdAt: new Date('2024-09-20'),
    },
  ];

  showAddModal = false;
  showEditModal = false;
  selectedUser: User | null = null;

  newUser: Partial<User> = {};
  editForm: Partial<User & { password: string }> = {};

  searchTerm = '';

  get filteredUsers(): User[] {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
  }

  get activeCount(): number {
    return this.users.filter((u) => u.status === 'active').length;
  }

  get inactiveCount(): number {
    return this.users.filter((u) => u.status === 'inactive').length;
  }

  ngOnInit(): void {}

  openAddModal(): void {
    this.newUser = { status: 'active' };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.newUser = {};
  }

  addUser(): void {
    if (!this.newUser.name || !this.newUser.email) return;
    const user: User = {
      id: `USR-${String(this.users.length + 1).padStart(3, '0')}`,
      name: this.newUser.name!,
      email: this.newUser.email!,
      role: this.newUser.role || 'Viewer',
      status: this.newUser.status || 'active',
      createdAt: new Date(),
    };
    this.users = [user, ...this.users];
    this.closeAddModal();
  }

  openEditModal(user: User): void {
    this.selectedUser = user;
    this.editForm = { ...user, password: '' };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedUser = null;
    this.editForm = {};
  }

  updateUser(): void {
    if (!this.selectedUser) return;
    this.users = this.users.map((u) =>
      u.id === this.selectedUser!.id
        ? {
            ...u,
            name: this.editForm.name || u.name,
            email: this.editForm.email || u.email,
            role: this.editForm.role || u.role,
            status: this.editForm.status || u.status,
          }
        : u
    );
    this.closeEditModal();
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((u) => u.id !== id);
  }

  toggleStatus(user: User): void {
    user.status = user.status === 'active' ? 'inactive' : 'active';
  }
}