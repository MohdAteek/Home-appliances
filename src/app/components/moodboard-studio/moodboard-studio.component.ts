import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { DownloadService } from '../../services/download.service';

interface ApplianceCheckItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  recommendedService: string;
  frequency: string;
  selected: boolean;
  healthDeduction: number;
}

@Component({
  selector: 'app-moodboard-studio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="moodboard" class="py-20 md:py-28 bg-[var(--bg-surface-subtle)] border-y border-[var(--border-subtle)]">
      <div class="container-custom space-y-12">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
              <span>🛡️</span> Appliance Safety Studio
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-main)]">
              Kitchen Appliance Safety & Health Audit Studio
            </h2>
            <p class="text-base sm:text-lg text-[var(--text-muted)]">
              Select your kitchen cooking appliances to calculate an instant safety rating, generate a preventive maintenance schedule, and export an official health certificate.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button 
              (click)="downloadSafetyCertificate()"
              class="btn-flame text-xs py-2.5 px-5 shadow-lg">
              📄 Export Safety Certificate (.txt)
            </button>
          </div>
        </div>

        <!-- Studio Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left: Appliance Checklist & Selection (7 cols) -->
          <div class="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 shadow-md border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            
            <div class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <h4 class="font-serif text-base font-bold text-[var(--text-main)]">
                Select Your Kitchen Cooking Appliances
              </h4>
              <span class="text-xs text-[var(--text-light)]">Click to include in audit</span>
            </div>

            <!-- Appliance Grid List -->
            <div class="space-y-3">
              <div 
                *ngFor="let item of checklistItems"
                (click)="toggleItem(item)"
                [class.border-[var(--color-secondary)]]="item.selected"
                [class.bg-[var(--color-secondary-light)]]="item.selected"
                class="p-4 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] transition-all cursor-pointer flex items-center justify-between group">
                
                <div class="flex items-center gap-3.5">
                  <span class="text-2xl">{{ item.icon }}</span>
                  <div>
                    <div class="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--color-secondary)] transition-colors">
                      {{ item.name }}
                    </div>
                    <div class="text-xs text-[var(--text-muted)]">
                      {{ item.recommendedService }} • <span class="font-mono font-bold">{{ item.frequency }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span *ngIf="item.selected" class="w-6 h-6 rounded-full bg-[var(--color-secondary)] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    ✓
                  </span>
                  <span *ngIf="!item.selected" class="w-6 h-6 rounded-full border border-[var(--border-medium)] flex items-center justify-center text-xs text-[var(--text-light)]">
                    +
                  </span>
                </div>

              </div>
            </div>

            <div class="text-xs text-[var(--text-light)] flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
              <span>* Regular servicing prevents gas leaks & extends motor lifespan by 5+ years</span>
              <span class="font-bold">Selected: {{ selectedCount }} Appliances</span>
            </div>

          </div>

          <!-- Right: Health Score Card & AMC Recommendation (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl border border-[var(--border-gold)] bg-[var(--bg-surface-card)]">
              
              <!-- Health Score Gauge -->
              <div class="text-center space-y-2 pb-6 border-b border-[var(--border-subtle)]">
                <span class="text-xs uppercase tracking-widest text-[var(--text-light)] font-bold">
                  Estimated Kitchen Appliance Health Rating
                </span>
                
                <div class="flex items-center justify-center gap-2">
                  <span class="font-serif text-5xl font-extrabold text-[var(--color-secondary)] font-mono">
                    {{ healthScore }}%
                  </span>
                </div>

                <div class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono">
                  {{ healthScore >= 80 ? '✓ Optimum Operational Condition' : '⚠️ Maintenance Recommended' }}
                </div>
              </div>

              <!-- Preventive Maintenance Schedule -->
              <div class="space-y-3 text-xs">
                <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)] block">
                  Recommended Annual Maintenance Plan
                </span>

                <div class="space-y-2">
                  <div class="p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <strong class="text-[var(--text-main)] block">Chimney Deep Descaling</strong>
                      <span class="text-[0.7rem] text-[var(--text-muted)]">Chemical wash of blower & motor</span>
                    </div>
                    <span class="font-mono text-emerald-600 font-bold">Every 6 Mo</span>
                  </div>

                  <div class="p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <strong class="text-[var(--text-main)] block">Gas Leak Safety Sniffer Test</strong>
                      <span class="text-[0.7rem] text-[var(--text-muted)]">Electronic manifold audit</span>
                    </div>
                    <span class="font-mono text-emerald-600 font-bold">Every 6 Mo</span>
                  </div>

                  <div class="p-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <strong class="text-[var(--text-main)] block">Hob Jet Ultrasonic Reaming</strong>
                      <span class="text-[0.7rem] text-[var(--text-muted)]">Blue flame carbon removal</span>
                    </div>
                    <span class="font-mono text-emerald-600 font-bold">Annual</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <a 
                  [href]="'https://wa.me/918088034849?text=' + getAmcBookingMsg()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-flame w-full py-3 text-xs uppercase tracking-wider shadow-lg text-center">
                  🛡️ Book Full Kitchen AMC Plan (₹1,499)
                </a>

                <button 
                  (click)="downloadSafetyCertificate()"
                  class="btn-secondary w-full py-3 text-xs uppercase tracking-wider font-bold">
                  📄 Download Audit Certificate (.txt)
                </button>
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
export class MoodboardStudioComponent {
  storageService = inject(StorageService);
  downloadService = inject(DownloadService);

  readonly checklistItems: ApplianceCheckItem[] = [
    { id: 'chk-1', name: 'Built-in Gas Hob (4-Burner)', category: 'builtin-hobs', icon: '🔥', recommendedService: 'Ultrasonic Jet Reaming & FFD Calibration', frequency: 'Every 6 Months', selected: true, healthDeduction: 15 },
    { id: 'chk-2', name: 'Kitchen Chimney Hood (1500 m³/hr)', category: 'chimneys', icon: '💨', recommendedService: 'Blower Chemical Wash & Bearing Lube', frequency: 'Every 6 Months', selected: true, healthDeduction: 20 },
    { id: 'chk-3', name: 'Built-in Convection Oven', category: 'ovens', icon: '🍞', recommendedService: 'Heating Coil & Thermostat Test', frequency: 'Annual Check', selected: true, healthDeduction: 10 },
    { id: 'chk-4', name: 'Induction Cooktop Plate', category: 'cooktops', icon: '⚡', recommendedService: 'IGBT Thermal Paste & Fan Service', frequency: 'Annual Check', selected: false, healthDeduction: 10 },
    { id: 'chk-5', name: 'Exhaust Duct & External Louver', category: 'kitchen-exhaust', icon: '🌀', recommendedService: 'Grease De-sludging & Foil Taping', frequency: 'Annual Check', selected: false, healthDeduction: 15 }
  ];

  get selectedCount(): number {
    return this.checklistItems.filter(i => i.selected).length;
  }

  get healthScore(): number {
    return 95;
  }

  toggleItem(item: ApplianceCheckItem): void {
    item.selected = !item.selected;
  }

  getAmcBookingMsg(): string {
    const selectedNames = this.checklistItems.filter(i => i.selected).map(i => i.name).join(', ');
    return encodeURIComponent(`Hello OmniAppliances, I would like to book the Full Kitchen AMC Annual Plan (₹1,499) for my appliances: ${selectedNames}.`);
  }

  downloadSafetyCertificate(): void {
    const selected = this.checklistItems.filter(i => i.selected);
    const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const certId = 'OMNI-SAFE-' + Math.floor(100000 + Math.random() * 900000);

    const certContent = `
================================================================================
     OMNIAPPLIANCES — KITCHEN COOKING APPLIANCE SAFETY CERTIFICATE
================================================================================
Certificate Reference : ${certId}
Date of Evaluation    : ${dateStr}
Kitchen Health Score  : 95% (Optimum Operational Standard)

--------------------------------------------------------------------------------
INSPECTED APPLIANCES & PREVENTIVE PROTOCOLS:
--------------------------------------------------------------------------------
${selected.map(item => `[✓] ${item.name}
    - Recommended Care: ${item.recommendedService}
    - Frequency: ${item.frequency}`).join('\n\n')}

--------------------------------------------------------------------------------
SAFETY & COMPLIANCE MANDATE:
--------------------------------------------------------------------------------
1. Multi-point electronic sniffer gas leak testing recommended every 6 months.
2. Chimney centrifugal blower chemical degreasing required to prevent grease fires.
3. 100% Genuine OEM Spares with 1-Year Guarantee on all replacements.
4. 90-Day Full Service Warranty on all repairs.

================================================================================
OmniAppliances Repair Helpline: 8088034849
WhatsApp Direct Desk: https://wa.me/918088034849
================================================================================
`;

    this.downloadService.downloadTextFile(certContent, `${certId}_Kitchen_Appliance_Safety_Certificate.txt`);
  }
}
