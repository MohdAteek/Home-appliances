import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { InteriorService } from '../../services/interior.service';
import { DownloadService } from '../../services/download.service';
import { RoomCategoryId, ConsultationRequest } from '../../models/interior.models';

@Component({
  selector: 'app-consultation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      (click)="close.emit()">
      
      <div 
        class="bg-[var(--bg-surface)] text-[var(--text-main)] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[var(--border-medium)] p-6 sm:p-8 space-y-6"
        (click)="$event.stopPropagation()">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div class="space-y-1">
            <span class="badge-pill badge-flame text-[0.7rem] font-bold">⚡ Doorstep Service Dispatch</span>
            <h3 class="font-serif text-2xl sm:text-3xl font-bold">
              Book Doorstep Repair Technician
            </h3>
            <p class="text-xs text-[var(--text-muted)]">
              Factory-trained technician will visit your location with genuine OEM spares and gas safety diagnostic tools.
            </p>
          </div>

          <button 
            (click)="close.emit()"
            class="btn-icon text-lg"
            aria-label="Close modal">
            ✕
          </button>
        </div>

        <!-- State 1: Booking Form -->
        <form *ngIf="!submittedRequest" (ngSubmit)="submitBooking()" class="space-y-5">
          
          <!-- Name & Email -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Full Name *</label>
              <input 
                type="text" 
                [(ngModel)]="formData.name" 
                name="name" 
                required 
                placeholder="e.g. Sameer Khan"
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Email Address *</label>
              <input 
                type="email" 
                [(ngModel)]="formData.email" 
                name="email" 
                required 
                placeholder="sameer@example.com"
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium"
              />
            </div>
          </div>

          <!-- Phone & Category -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Phone Number *</label>
              <input 
                type="tel" 
                [(ngModel)]="formData.phone" 
                name="phone" 
                required
                placeholder="8088034849"
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Appliance Needing Service *</label>
              <select 
                [(ngModel)]="formData.category" 
                name="category" 
                required
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium">
                <option *ngFor="let cat of interiorService.categories" [value]="cat.id">
                  {{ cat.name }} (Starting ₹{{ cat.servicePriceStartingINR }})
                </option>
              </select>
            </div>
          </div>

          <!-- Appliance Issue & Preferred Timeline -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Appliance Issue Type</label>
              <select 
                [(ngModel)]="formData.projectScope" 
                name="projectScope"
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium">
                <option value="Auto-Ignition Clicking Non-Stop / Spark Failure">Auto-Ignition Clicking / Spark Failure</option>
                <option value="Chimney Suction Drop / Heavy Blower Vibration">Chimney Suction Drop / Blower Noise</option>
                <option value="Chimney Deep Chemical Wash & Descaling (₹799)">Chimney Deep Chemical Wash (₹799)</option>
                <option value="Suspected Gas Odor / Micro-Leakage Emergency">Gas Odor / Leakage (Emergency)</option>
                <option value="Low Flame / Heavy Yellow Soot on Utensils">Low Flame / Yellow Soot Output</option>
                <option value="Oven Not Heating / Breaker Tripping / Error Code">Oven Heating Failure / Error Code</option>
                <option value="Induction Error Code (E0/E1/E6) / IGBT Pop">Induction Error Code / Power Trip</option>
                <option value="Broken Hob Glass / Replacement Spare Needed">Broken Hob Glass / Spare Part Fitting</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Preferred Service Time Slot</label>
              <select 
                [(ngModel)]="formData.timeline" 
                name="timeline" 
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium">
                <option value="Emergency (Within 90-120 Minutes)">Emergency (Within 90-120 Minutes)</option>
                <option value="Today Morning (10:00 AM - 01:00 PM)">Today Morning (10:00 AM - 01:00 PM)</option>
                <option value="Today Afternoon (02:00 PM - 05:00 PM)">Today Afternoon (02:00 PM - 05:00 PM)</option>
                <option value="Today Evening (05:00 PM - 08:00 PM)">Today Evening (05:00 PM - 08:00 PM)</option>
                <option value="Tomorrow Scheduled Slot">Tomorrow Scheduled Slot</option>
              </select>
            </div>
          </div>

          <!-- Brand & Date -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Appliance Brand</label>
              <select 
                [(ngModel)]="formData.budgetTier" 
                name="budgetTier" 
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium">
                <option *ngFor="let b of interiorService.brands" [value]="b.name">
                  {{ b.name }} ({{ b.origin }})
                </option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Preferred Date</label>
              <input 
                type="date" 
                [(ngModel)]="formData.preferredDate" 
                name="preferredDate" 
                class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium"
              />
            </div>
          </div>

          <!-- Problem Description Notes -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Fault Details / Kitchen Address (Optional)</label>
            <textarea 
              [(ngModel)]="formData.projectScopeNotes" 
              name="notes" 
              rows="2"
              placeholder="e.g. 4th floor flat, Siemens hob middle burner clicking continuously, smell of gas..."
              class="w-full bg-[var(--bg-surface-subtle)] text-[var(--text-main)] text-sm rounded-xl p-3 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium resize-none">
            </textarea>
          </div>

          <!-- Service Rate Assurance & Submit Button -->
          <div class="pt-2 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-xs text-[var(--text-muted)] space-y-0.5 text-center sm:text-left">
              <span class="block font-bold text-emerald-600">✓ Transparent Doorstep Diagnostic from ₹399</span>
              <span class="block text-[0.7rem]">100% Genuine OEM Spares • 90-Day Service Guarantee</span>
            </div>

            <button 
              type="submit" 
              class="btn-flame text-xs uppercase tracking-wider py-3.5 px-8 shadow-xl whitespace-nowrap w-full sm:w-auto">
              Confirm & Book Technician →
            </button>
          </div>

        </form>

        <!-- 3. Confirmation Success Screen -->
        <div *ngIf="submittedRequest" class="py-8 text-center space-y-6 animate-fade-in">
          
          <div class="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500/30 flex items-center justify-center text-4xl mx-auto">
            ✓
          </div>

          <div class="space-y-2">
            <span class="badge-pill bg-emerald-500/20 text-emerald-600 text-xs font-bold">Technician Dispatched</span>
            <h4 class="font-serif text-2xl sm:text-3xl font-bold">
              Booking Confirmed! Technician Contacting You Shortly
            </h4>
            <p class="text-sm text-[var(--text-muted)] max-w-md mx-auto">
              Your service request reference has been registered in the OmniAppliances system.
            </p>
          </div>

          <!-- Receipt Details Box -->
          <div class="bg-[var(--bg-surface-subtle)] p-6 rounded-2xl border border-[var(--border-subtle)] text-xs text-left space-y-2 max-w-md mx-auto">
            <div class="flex justify-between py-1 border-b border-[var(--border-subtle)]">
              <span class="text-[var(--text-muted)]">Booking Reference:</span>
              <strong class="font-mono text-[var(--color-secondary)]">{{ submittedRequest.id }}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-[var(--border-subtle)]">
              <span class="text-[var(--text-muted)]">Customer Name:</span>
              <strong class="text-[var(--text-main)]">{{ submittedRequest.name }}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-[var(--border-subtle)]">
              <span class="text-[var(--text-muted)]">Phone:</span>
              <strong class="text-[var(--text-main)]">{{ submittedRequest.phone }}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-[var(--border-subtle)]">
              <span class="text-[var(--text-muted)]">Service Required:</span>
              <strong class="text-[var(--text-main)]">{{ submittedRequest.projectScope }}</strong>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-[var(--text-muted)]">Time Slot:</span>
              <strong class="text-emerald-600">{{ submittedRequest.timeline }}</strong>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button 
              (click)="downloadReceipt()"
              class="btn-flame text-xs py-2.5 px-5 shadow-md">
              📄 Download Booking Receipt (.txt)
            </button>
            <button 
              (click)="close.emit()"
              class="btn-primary text-xs py-2.5 px-6 font-bold">
              Done
            </button>
          </div>

        </div>

      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ConsultationModalComponent {
  storageService = inject(StorageService);
  interiorService = inject(InteriorService);
  downloadService = inject(DownloadService);

  initialCategoryId = input<RoomCategoryId | null>(null);
  close = output<void>();

  formData = {
    name: '',
    email: '',
    phone: '',
    category: 'builtin-hobs' as RoomCategoryId,
    projectScope: 'Auto-Ignition Clicking Non-Stop / Spark Failure',
    timeline: 'Emergency (Within 90-120 Minutes)',
    budgetTier: 'Bosch',
    preferredDate: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (10:00 AM - 01:00 PM)',
    projectScopeNotes: ''
  };

  submittedRequest: ConsultationRequest | null = null;

  ngOnInit() {
    if (this.initialCategoryId()) {
      this.formData.category = this.initialCategoryId()!;
    }
  }

  submitBooking(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.phone) {
      this.downloadService.showToast('Please provide your name, email, and phone number.');
      return;
    }

    const booking: ConsultationRequest = {
      id: 'OMNI-SVC-' + Math.floor(100000 + Math.random() * 900000),
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      category: this.formData.category,
      projectScope: this.formData.projectScope,
      budgetTier: this.formData.budgetTier,
      timeline: this.formData.timeline,
      preferredDate: this.formData.preferredDate,
      timeSlot: this.formData.timeSlot,
      projectScopeNotes: this.formData.projectScopeNotes,
      createdAt: new Date().toISOString()
    };

    this.storageService.saveBooking(booking);
    this.submittedRequest = booking;
    this.downloadService.showToast(`✓ Technician booked! Reference: ${booking.id}`);
  }

  downloadReceipt(): void {
    if (!this.submittedRequest) return;
    const b = this.submittedRequest;

    const receiptContent = `
================================================================================
  OMNIAPPLIANCES — OFFICIAL DOORSTEP TECHNICIAN BOOKING RECEIPT
================================================================================
Booking Reference   : ${b.id}
Customer Name       : ${b.name}
Phone Helpline      : ${b.phone}
Email               : ${b.email}
Appliance Category  : ${b.category.toUpperCase()}
Fault Type / Scope  : ${b.projectScope}
Appliance Brand     : ${b.budgetTier}
Service Time Window : ${b.timeline}
Service Date        : ${b.preferredDate}

ADDRESS & FAULT SPECIFICATION:
${b.projectScopeNotes || 'No specific notes provided.'}

--------------------------------------------------------------------------------
SERVICE ASSURANCE:
- Doorstep Technician Visit within 90-120 minutes.
- Doorstep Inspection & Service Charge: ₹399.
- Electronic Sniffer Gas Leakage Audit Included.
- 100% Genuine OEM Spares with 1-Year Guarantee.
- 90-Day Full Service Warranty.
--------------------------------------------------------------------------------
OmniAppliances Repair Helpline: 8088034849
WhatsApp Direct: https://wa.me/918088034849
================================================================================
`;

    this.downloadService.downloadTextFile(receiptContent, `${b.id}_Technician_Booking_Receipt.txt`);
  }
}
