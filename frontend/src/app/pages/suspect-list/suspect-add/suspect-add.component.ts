import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Breadcrumb } from "../../../layout/breadcrumb/breadcrumb";
import { BreadcrumbService } from '../../../services/breadcrumb';

@Component({
  selector: 'app-suspect-add',
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb],
  templateUrl: './suspect-add.component.html',
  styleUrl: './suspect-add.component.scss',
})
export class SuspectAddComponent {
  private fb = inject(FormBuilder);
  private bc = inject(BreadcrumbService);
  private readonly currentUser = 'admin';

  selectedPhotoFile: File | null = null;
  successMessage = '';

  offenceTypes = [
    'Possession of heroin',
    'Possession of cannabis',
    'Drug trafficking',
    'Possession of methamphetamine',
    'Distribution of narcotics',
    'Possession of illegal prescription drugs',
  ];

  policeStations = [
    'Negombo Police Station',
    'Minuwangoda Police Station',
    'Katunayake Police Station',
    'Seeduwa Police Station',
    'Kochchikade Police Station',
  ];

  courts = [
    { CourtId: 'CRT-NEG-001', Court: 'Negombo Court' },
    { CourtId: 'CRT-MIN-001', Court: 'Minuwangoda Court' },
  ];

  statuses = ['Active', 'Under Investigation', 'Charged', 'Convicted', 'Closed', 'Released'];

  suspectForm: FormGroup = this.fb.group({
    CaseNumber: [this.generateCaseNumber(), Validators.required],
    FullName: ['', Validators.required],
    Alias: [''],
    Nickname: [''],
    NIC: ['', [Validators.required, Validators.pattern(/^(\d{9}[VXvx]|\d{12})$/)]],
    PassportNumber: ['', Validators.minLength(6)],
    DateOfBirth: ['', [Validators.required, this.futureDateValidator]],
    Address: [''],
    ContactNumber: ['', Validators.pattern(/^(\+94\d{9}|0\d{9})$/)],
    Occupation: [''],
    Nationality: ['', Validators.required],
    Photograph: ['assets/user.png'],
    DateRecorded: ['', [Validators.required, this.futureDateValidator]],
    RecordingOfficer: ['', Validators.required],
    Notes: [''],
    CreatedBy: [this.currentUser],
    CreatedAt: [''],
    UpdateBy: [this.currentUser],
    UpdatedAt: [''],
    Attachments: this.fb.array([this.createAttachmentGroup(0)]),
    OffenceType: ['', Validators.required],
    PoliceStation: ['', Validators.required],
    CourtDetails: this.fb.group({
      CourtId: ['', Validators.required],
      Court: ['', Validators.required],
    }),
    Status: ['', Validators.required],
    Remarks: [''],
  });

  get attachments(): FormArray {
    return this.suspectForm.get('Attachments') as FormArray;
  }

    ngOnInit(): void {
        this.bc.set([
      { label: 'Home',         path: '/home2' },
      { label: 'Add New Suspect' }               // no path = current page
    ]);
  }


  addAttachment(): void {
    this.attachments.push(this.createAttachmentGroup(this.attachments.length));
  }

  removeAttachment(index: number): void {
    if (this.attachments.length === 1) {
      this.attachments.at(0).reset({
        AttachmentId: this.generateAttachmentId(0),
        FileName: '',
        FileType: '',
        MimeType: '',
        FilePath: '',
        Description: '',
      });
      return;
    }

    this.attachments.removeAt(index);
    this.refreshAttachmentIds();
  }

  generateAttachmentId(index: number): string {
    return `ATT-NEW-${String(index + 1).padStart(2, '0')}`;
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    this.selectedPhotoFile = file;

    this.suspectForm.patchValue({
      Photograph: file ? `assets/uploads/suspects/${file.name}` : 'assets/user.png',
    });
  }

  onAttachmentSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const fileType = file.type === 'application/pdf'
      ? 'PDF'
      : file.type.startsWith('image/')
        ? 'Image'
        : 'Scanned Doc';

    this.attachments.at(index).patchValue({
      FileName: file.name,
      FileType: fileType,
      MimeType: file.type,
      FilePath: `assets/uploads/attachments/${file.name}`,
      Description: 'Uploaded attachment file',
    });
  }

  onCourtChange(): void {
    const courtId = this.suspectForm.get('CourtDetails.CourtId')?.value;
    const selectedCourt = this.courts.find((court) => court.CourtId === courtId);

    this.suspectForm.get('CourtDetails.Court')?.setValue(selectedCourt?.Court || '');
  }

  resetForm(): void {
    this.successMessage = '';
    this.selectedPhotoFile = null;
    this.attachments.clear();
    this.attachments.push(this.createAttachmentGroup(0));
    this.suspectForm.reset({
      CaseNumber: this.generateCaseNumber(),
      Photograph: 'assets/user.png',
      CreatedBy: this.currentUser,
      CreatedAt: '',
      UpdateBy: this.currentUser,
      UpdatedAt: '',
      CourtDetails: {
        CourtId: '',
        Court: '',
      },
    });
  }

  submitForm(): void {
    this.successMessage = '';

    if (this.suspectForm.invalid) {
      this.suspectForm.markAllAsTouched();
      return;
    }

    const now = new Date().toISOString();
    const rawValue = this.suspectForm.getRawValue();
    const suspect = {
      ...rawValue,
      CaseNumber: rawValue.CaseNumber || this.generateCaseNumber(),
      CreatedBy: this.currentUser,
      CreatedAt: now,
      UpdateBy: this.currentUser,
      UpdatedAt: now,
      Attachments: rawValue.Attachments.map((attachment: any, index: number) => ({
        ...attachment,
        AttachmentId: attachment.AttachmentId || this.generateAttachmentId(index),
      })),
    };

    console.log('New suspect object:', suspect);
    this.successMessage = 'Suspect record saved successfully.';
    this.suspectForm.patchValue({
      CaseNumber: suspect.CaseNumber,
      CreatedBy: suspect.CreatedBy,
      CreatedAt: suspect.CreatedAt,
      UpdateBy: suspect.UpdateBy,
      UpdatedAt: suspect.UpdatedAt,
    });
  }

  isInvalid(controlPath: string): boolean {
    const control = this.suspectForm.get(controlPath);
    return Boolean(control && control.invalid && (control.dirty || control.touched));
  }

  private createAttachmentGroup(index: number): FormGroup {
    return this.fb.group({
      AttachmentId: [this.generateAttachmentId(index)],
      FileName: [''],
      FileType: [''],
      MimeType: [''],
      FilePath: [''],
      Description: [''],
    });
  }

  private generateCaseNumber(): string {
    const year = new Date().getFullYear();
    return `NCB-${year}-0001`;
  }

  private refreshAttachmentIds(): void {
    this.attachments.controls.forEach((control, index) => {
      control.get('AttachmentId')?.setValue(this.generateAttachmentId(index));
    });
  }

  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate > today ? { futureDate: true } : null;
  }
}
