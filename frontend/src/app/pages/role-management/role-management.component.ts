import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from "../../layout/breadcrumb/breadcrumb";
import { BreadcrumbService } from '../../services/breadcrumb';

export interface Permission {
  key: string;
  label: string;
  group: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: Date;
  isSystem?: boolean;
}

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {

  // ── All available permissions ────────────────────────────────
  allPermissions: Permission[] = [
    // Cases
    { key: 'cases.view',   label: 'View Cases',   group: 'Cases' },
    { key: 'cases.create', label: 'Create Cases', group: 'Cases' },
    { key: 'cases.edit',   label: 'Edit Cases',   group: 'Cases' },
    { key: 'cases.close',  label: 'Close Cases',  group: 'Cases' },
    // Users
    { key: 'users.view',   label: 'View Users',   group: 'Users' },
    { key: 'users.manage', label: 'Manage Users', group: 'Users' },
    // Reports
    { key: 'reports.view',   label: 'View Reports',   group: 'Reports' },
    { key: 'reports.export', label: 'Export Reports', group: 'Reports' },
    // Roles
    { key: 'roles.view',   label: 'View Roles',   group: 'Roles' },
    { key: 'roles.manage', label: 'Manage Roles', group: 'Roles' },
    // System
    { key: 'system.audit',    label: 'Audit Logs',     group: 'System' },
    { key: 'system.settings', label: 'System Settings', group: 'System' },
  ];

  roles: Role[] = [
    {
      id: 'ROLE-001',
      name: 'Admin',
      description: 'Full system access with all permissions',
      permissions: this.allPermissions.map(p => p.key),
      userCount: 2,
      createdAt: new Date('2024-01-01'),
      isSystem: true,
    },
    {
      id: 'ROLE-002',
      name: 'Supervisor',
      description: 'Oversees cases and manages analyst teams',
      permissions: ['cases.view','cases.create','cases.edit','cases.close','users.view','reports.view','reports.export'],
      userCount: 5,
      createdAt: new Date('2024-01-01'),
      isSystem: true,
    },
    {
      id: 'ROLE-003',
      name: 'Analyst',
      description: 'Manages assigned cases and generates reports',
      permissions: ['cases.view','cases.create','cases.edit','reports.view'],
      userCount: 14,
      createdAt: new Date('2024-02-10'),
    },
    {
      id: 'ROLE-004',
      name: 'Viewer',
      description: 'Read-only access to cases and reports',
      permissions: ['cases.view','reports.view'],
      userCount: 8,
      createdAt: new Date('2024-03-15'),
    },
  ];

  showAddModal     = false;
  showEditModal    = false;
  showRemoveConfirm = false;
  showAssignModal  = false;

  selectedRole: Role | null = null;
  roleToRemove:  Role | null = null;

  newRole: Partial<Role> = { permissions: [] };
  editForm: Partial<Role> = {};

  searchTerm = '';

  // ── Assign / Unassign state ──────────────────────────────────
  assignRoleId  = '';
  unassignUserId = '';

  availableUsers = [
    { id: 'USR-001', name: 'Adrian Cole',   currentRole: 'Analyst' },
    { id: 'USR-002', name: 'Maya Reyes',    currentRole: 'Supervisor' },
    { id: 'USR-003', name: 'Nathan Obi',    currentRole: 'Viewer' },
    { id: 'USR-004', name: 'Priya Sharma',  currentRole: 'Analyst' },
    { id: 'USR-005', name: 'Leon Müller',   currentRole: 'Viewer' },
  ];

  constructor(
    private breadcrumbService: BreadcrumbService
  ){
    
  }

  ngOnInit(): void {
    this.breadcrumbService.set([
      { label: 'Home', path: '/home' },
      { label: 'Role Management' },
    ]);
  }



  get filteredRoles(): Role[] {
    const term = this.searchTerm.toLowerCase();
    return this.roles.filter(
      r => r.name.toLowerCase().includes(term) ||
           r.description.toLowerCase().includes(term)
    );
  }

  get permissionGroups(): string[] {
    return [...new Set(this.allPermissions.map(p => p.group))];
  }

  permissionsInGroup(group: string): Permission[] {
    return this.allPermissions.filter(p => p.group === group);
  }

  // ── Add Role ─────────────────────────────────────────────────
  openAddModal(): void {
    this.newRole = { permissions: [] };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.newRole = {};
  }

  addRole(): void {
    if (!this.newRole.name) return;
    const role: Role = {
      id: `ROLE-${String(this.roles.length + 1).padStart(3, '0')}`,
      name: this.newRole.name!,
      description: this.newRole.description || '',
      permissions: this.newRole.permissions || [],
      userCount: 0,
      createdAt: new Date(),
    };
    this.roles = [role, ...this.roles];
    this.closeAddModal();
  }

  // ── Remove Role ──────────────────────────────────────────────
  confirmRemove(role: Role): void {
    this.roleToRemove = role;
    this.showRemoveConfirm = true;
  }

  cancelRemove(): void {
    this.roleToRemove = null;
    this.showRemoveConfirm = false;
  }

  removeRole(): void {
    if (!this.roleToRemove) return;
    this.roles = this.roles.filter(r => r.id !== this.roleToRemove!.id);
    this.cancelRemove();
  }

  // ── Assign / Unassign ────────────────────────────────────────
  openAssignModal(role: Role): void {
    this.selectedRole = role;
    this.assignRoleId  = '';
    this.unassignUserId = '';
    this.showAssignModal = true;
  }

  closeAssignModal(): void {
    this.showAssignModal = false;
    this.selectedRole = null;
  }

  assignRole(): void {
    if (!this.assignRoleId || !this.selectedRole) return;
    const user = this.availableUsers.find(u => u.id === this.assignRoleId);
    if (user) {
      // Decrement old role count
      const oldRole = this.roles.find(r => r.name === user.currentRole);
      if (oldRole && oldRole.userCount > 0) oldRole.userCount--;
      // Update user's role
      user.currentRole = this.selectedRole.name;
      // Increment new role count
      this.selectedRole.userCount++;
    }
    this.assignRoleId = '';
  }

  unassignRole(): void {
    if (!this.unassignUserId || !this.selectedRole) return;
    const user = this.availableUsers.find(u => u.id === this.unassignUserId);
    if (user && user.currentRole === this.selectedRole.name) {
      user.currentRole = 'Viewer';
      if (this.selectedRole.userCount > 0) this.selectedRole.userCount--;
      const viewerRole = this.roles.find(r => r.name === 'Viewer');
      if (viewerRole) viewerRole.userCount++;
    }
    this.unassignUserId = '';
  }

  usersWithRole(roleName: string) {
    return this.availableUsers.filter(u => u.currentRole === roleName);
  }

  // ── Permission toggle helpers ────────────────────────────────
  hasPermission(permissions: string[], key: string): boolean {
    return permissions.includes(key);
  }

  toggleNewPerm(key: string): void {
    const perms = this.newRole.permissions || [];
    const idx = perms.indexOf(key);
    if (idx > -1) { perms.splice(idx, 1); }
    else { perms.push(key); }
    this.newRole.permissions = [...perms];
  }

  permLabel(key: string): string {
    return this.allPermissions.find(p => p.key === key)?.label || key;
  }

  permGroupIcon(group: string): string {
    const map: Record<string, string> = {
      'Cases':   'ti-folder-open',
      'Users':   'ti-users',
      'Reports': 'ti-chart-bar',
      'Roles':   'ti-shield',
      'System':  'ti-settings',
    };
    return map[group] || 'ti-point';
  }
}