import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InteriorService } from '../../services/interior.service';
import { DownloadService } from '../../services/download.service';
import { RoomCategoryId } from '../../models/interior.models';

@Component({
  selector: 'app-cost-estimator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="estimator" class="py-20 md:py-28 bg-[var(--bg-surface)]">
      <div class="container-custom space-y-12">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
            <span>📐</span> Transparent Rate Card
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)]">
            Appliance Repair Cost & Service Estimator
          </h2>
          <p class="text-base sm:text-lg text-[var(--text-muted)]">
            Calculate your estimated repair, deep descaling, or annual maintenance plan cost with fixed transparent rates and 90-day service warranty.
          </p>
        </div>

        <!-- Interactive Calculator Card -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left: Input Controls (7 cols) -->
          <div class="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl space-y-8 shadow-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-card)]">
            
            <!-- 1. Primary Appliance Category -->
            <div class="space-y-3">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)] block">
                1. Select Appliance Needing Repair / Service
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button 
                  *ngFor="let cat of interiorService.categories.slice(0, 6)"
                  (click)="selectedCategory = cat.id; recalculate()"
                  [class.bg-[var(--color-primary)]]="selectedCategory === cat.id"
                  [class.text-white]="selectedCategory === cat.id"
                  [class.border-[var(--color-secondary)]]="selectedCategory === cat.id"
                  [class.bg-[var(--bg-surface-subtle)]]="selectedCategory !== cat.id"
                  [class.text-[var(--text-main)]]="selectedCategory !== cat.id"
                  class="p-3 rounded-2xl border border-[var(--border-subtle)] text-xs font-bold text-left transition-all hover:scale-102 flex flex-col justify-between shadow-sm">
                  <span>{{ cat.name.split(' ')[0] }} Repair</span>
                  <span class="text-[0.65rem] opacity-75 font-normal mt-1 font-mono">From ₹{{ cat.servicePriceStartingINR }}</span>
                </button>
              </div>
            </div>

            <!-- 2. Service Tier -->
            <div class="space-y-3">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)] block">
                2. Select Service Scope & Maintenance Tier
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  (click)="tier = 'essential'; recalculate()"
                  [class.border-[var(--color-secondary)]]="tier === 'essential'"
                  [class.bg-[var(--color-secondary-light)]]="tier === 'essential'"
                  class="p-4 rounded-2xl border border-[var(--border-subtle)] text-left transition-all">
                  <div class="font-bold text-xs text-[var(--text-main)]">Basic Inspection (₹399)</div>
                  <div class="text-[0.7rem] text-[var(--text-muted)] mt-1">Multi-point diagnostic, gas leak sniffer audit & flame tuning</div>
                </button>

                <button 
                  (click)="tier = 'premium'; recalculate()"
                  [class.border-[var(--color-secondary)]]="tier === 'premium'"
                  [class.bg-[var(--color-secondary-light)]]="tier === 'premium'"
                  class="p-4 rounded-2xl border border-[var(--border-subtle)] text-left transition-all">
                  <div class="font-bold text-xs text-[var(--color-secondary)]">★ Deep Descaling (₹799)</div>
                  <div class="text-[0.7rem] text-[var(--text-muted)] mt-1">Full chemical wash, ultrasonic jet reaming & motor overhaul</div>
                </button>

                <button 
                  (click)="tier = 'bespoke'; recalculate()"
                  [class.border-[var(--color-secondary)]]="tier === 'bespoke'"
                  [class.bg-[var(--color-secondary-light)]]="tier === 'bespoke'"
                  class="p-4 rounded-2xl border border-[var(--border-subtle)] text-left transition-all">
                  <div class="font-bold text-xs text-[var(--text-main)]">Full Kitchen AMC (₹1,499)</div>
                  <div class="text-[0.7rem] text-[var(--text-muted)] mt-1">Annual plan: 4 quarterly visits + free unlimited breakdown visits</div>
                </button>
              </div>
            </div>

            <!-- 3. Diagnostic Checklist Inclusions -->
            <div class="space-y-3">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)] block">
                3. Specialized Diagnostic & Safety Checklist
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label class="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] cursor-pointer text-xs font-medium">
                  <input type="checkbox" [(ngModel)]="includeCivil" (ngModelChange)="recalculate()" class="w-4 h-4 accent-[var(--color-secondary)]">
                  <span>Electronic Gas Leak Sniffer Audit</span>
                </label>
                <label class="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] cursor-pointer text-xs font-medium">
                  <input type="checkbox" [(ngModel)]="includeWoodwork" (ngModelChange)="recalculate()" class="w-4 h-4 accent-[var(--color-secondary)]">
                  <span>Hob Pulse Spark Ignition & Micro-switch Fix</span>
                </label>
                <label class="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] cursor-pointer text-xs font-medium">
                  <input type="checkbox" [(ngModel)]="includeCeiling" (ngModelChange)="recalculate()" class="w-4 h-4 accent-[var(--color-secondary)]">
                  <span>Chimney Centrifugal Blower Chemical Wash</span>
                </label>
                <label class="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] cursor-pointer text-xs font-medium">
                  <input type="checkbox" [(ngModel)]="includeFurnishing" (ngModelChange)="recalculate()" class="w-4 h-4 accent-[var(--color-secondary)]">
                  <span>Built-in Oven Heating Coil & Sensor Check</span>
                </label>
                <label class="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] cursor-pointer text-xs font-medium">
                  <input type="checkbox" [(ngModel)]="includeAutomation" (ngModelChange)="recalculate()" class="w-4 h-4 accent-[var(--color-secondary)]">
                  <span>Induction Power Circuit & IGBT Test</span>
                </label>
                <label class="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] cursor-pointer text-xs font-medium">
                  <input type="checkbox" [(ngModel)]="includeFinishing" (ngModelChange)="recalculate()" class="w-4 h-4 accent-[var(--color-secondary)]">
                  <span>Aluminium Exhaust Duct De-sludging & Taping</span>
                </label>
              </div>
            </div>

          </div>

          <!-- Right: Package Breakdown (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl border border-[var(--border-gold)] bg-[var(--bg-surface-card)]">
              
              <!-- Total Estimated Service Price -->
              <div class="space-y-1 text-center pb-6 border-b border-[var(--border-subtle)]">
                <span class="text-xs uppercase tracking-widest text-[var(--text-light)] font-bold">
                  Estimated Doorstep Service Cost
                </span>
                <div class="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] font-mono">
                  ₹{{ result.packagePriceINR }}
                </div>
                <div class="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-1">
                  Includes Complete Safety Gas Audit & 90-Day Guarantee
                </div>
              </div>

              <!-- Quality & Warranty Badges -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)]">
                  <span class="text-[var(--text-light)] block text-[0.68rem] uppercase font-bold">Service Warranty</span>
                  <strong class="text-[var(--text-main)] font-semibold">90 Days Full Guarantee</strong>
                </div>
                <div class="p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)]">
                  <span class="text-[var(--text-light)] block text-[0.68rem] uppercase font-bold">Turnaround</span>
                  <strong class="text-[var(--text-main)] font-semibold">90-Min Doorstep Dispatch</strong>
                </div>
              </div>

              <!-- Scope Description -->
              <div class="space-y-3 text-xs">
                <div class="space-y-1">
                  <span class="text-[var(--text-light)] font-bold uppercase text-[0.68rem] block">Recommended Service Standard:</span>
                  <p class="text-[var(--text-main)] font-medium leading-relaxed bg-[var(--bg-surface-subtle)] p-2.5 rounded-lg border border-[var(--border-subtle)]">
                    {{ result.materialGrade }}
                  </p>
                </div>

                <div class="space-y-1">
                  <span class="text-[var(--text-light)] font-bold uppercase text-[0.68rem] block">OEM Spare Part Policy:</span>
                  <p class="text-[var(--text-main)] font-medium leading-relaxed bg-[var(--bg-surface-subtle)] p-2.5 rounded-lg border border-[var(--border-subtle)]">
                    {{ result.hardwareSpec }}
                  </p>
                </div>
              </div>

              <!-- Action Buttons: Download Formal Quotation & Book Consultation -->
              <div class="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <button 
                  (click)="downloadQuotation()"
                  class="btn-flame w-full py-3 text-xs uppercase tracking-wider shadow-lg">
                  📄 Download Service Rate Sheet (.txt)
                </button>

                <button 
                  (click)="openConsultation.emit()"
                  class="btn-secondary w-full py-3 text-xs uppercase tracking-wider font-bold">
                  📅 Book Doorstep Technician Now
                </button>
              </div>

              <div class="text-[0.65rem] text-center text-[var(--text-light)]">
                * Fixed transparent diagnostic fees. 100% genuine factory-sealed spare parts.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CostEstimatorComponent {
  interiorService = inject(InteriorService);
  downloadService = inject(DownloadService);
  openConsultation = output<void>();

  selectedCategory: RoomCategoryId = 'builtin-hobs';
  areaSqFt = 90;
  tier: 'essential' | 'premium' | 'bespoke' = 'premium';

  includeCivil = true;
  includeWoodwork = true;
  includeCeiling = true;
  includeFurnishing = false;
  includeAutomation = false;
  includeFinishing = true;

  result = this.interiorService.calculateScope({
    category: this.selectedCategory,
    areaSqFt: this.areaSqFt,
    tier: this.tier,
    includeCivilFlooring: this.includeCivil,
    includeModularWoodwork: this.includeWoodwork,
    includeCeilingLighting: this.includeCeiling,
    includeFurnishingDecor: this.includeFurnishing,
    includeSmartAutomation: this.includeAutomation,
    includeWallFinishing: this.includeFinishing
  });

  recalculate() {
    this.result = this.interiorService.calculateScope({
      category: this.selectedCategory,
      areaSqFt: this.areaSqFt,
      tier: this.tier,
      includeCivilFlooring: this.includeCivil,
      includeModularWoodwork: this.includeWoodwork,
      includeCeilingLighting: this.includeCeiling,
      includeFurnishingDecor: this.includeFurnishing,
      includeSmartAutomation: this.includeAutomation,
      includeWallFinishing: this.includeFinishing
    });
  }

  downloadQuotation() {
    const cat = this.interiorService.getCategoryById(this.selectedCategory);
    const categoryName = cat ? cat.name : this.selectedCategory;
    const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const quoteId = 'OMNI-REP-' + Math.floor(100000 + Math.random() * 900000);

    const quoteContent = `
================================================================================
        OMNIAPPLIANCES — OFFICIAL REPAIR & SERVICE ESTIMATE
================================================================================
Estimate Reference  : ${quoteId}
Date of Issue       : ${dateStr}
Appliance Category  : ${categoryName}
Service Tier        : ${this.tier.toUpperCase()}
Estimated Price     : ₹${this.result.packagePriceINR} (Fixed Upfront Diagnostic)
Service Warranty    : 90-Day Full Service Warranty + 1-Year Spare Part Guarantee
Turnaround Window   : Doorstep Technician Dispatch in 90 Minutes

--------------------------------------------------------------------------------
SERVICE SCOPE & REPAIR METHODOLOGY:
--------------------------------------------------------------------------------
- Standard : ${this.result.materialGrade}
- Policy   : ${this.result.hardwareSpec}

--------------------------------------------------------------------------------
DIAGNOSTIC & SAFETY CHECKPOINTS INCLUDED:
--------------------------------------------------------------------------------
1. Electronic Gas Leak Sniffer Audit : ${this.includeCivil ? 'INCLUDED' : 'OPTIONAL'}
2. Hob Spark & Micro-switch Tuning   : ${this.includeWoodwork ? 'INCLUDED' : 'OPTIONAL'}
3. Chimney Blower Chemical Wash      : ${this.includeCeiling ? 'INCLUDED' : 'OPTIONAL'}
4. Oven Heating Coil & Sensor Test   : ${this.includeFurnishing ? 'INCLUDED' : 'OPTIONAL'}
5. Induction Circuit & IGBT Check    : ${this.includeAutomation ? 'INCLUDED' : 'OPTIONAL'}
6. Exhaust Ducting De-sludging       : ${this.includeFinishing ? 'INCLUDED' : 'OPTIONAL'}

================================================================================
OMNIAPPLIANCES REPAIR HOTLINE & BOOKING:
Phone / 24/7 Helpline: 8088034849
WhatsApp Direct: https://wa.me/918088034849
Authorized Spares for Siemens, Bosch, Faber, Elica, Häfele, Gilma, Crompton, Hindware.
================================================================================
`;

    this.downloadService.downloadTextFile(quoteContent, `${quoteId}_Appliance_Repair_Estimate.txt`);
  }
}
