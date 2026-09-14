import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DownloadService } from '../../services/download.service';

interface DiagnosticModule {
  id: string;
  name: string;
  category: string;
  baseImage: string;
  symptoms: {
    part: string;
    normalStatus: string;
    commonFailure: string;
    fixAction: string;
    estCostINR: number;
  }[];
}

@Component({
  selector: 'app-room-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="visualizer" class="py-20 md:py-28 bg-[var(--bg-surface-subtle)] border-y border-[var(--border-subtle)]">
      <div class="container-custom space-y-12">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Interactive Diagnostic Workbench
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-main)]">
              Appliance Component Diagnostic Simulator
            </h2>
            <p class="text-base sm:text-lg text-[var(--text-muted)]">
              Select your cooking appliance to simulate electronic diagnostics, test burner ignition coils, inspect chimney suction blowers, and check instant repair costs.
            </p>
          </div>

          <!-- Download Custom Diagnostic Report -->
          <button 
            (click)="downloadDiagnosticReport()"
            class="btn-flame py-3 px-6 text-xs uppercase tracking-wider whitespace-nowrap shadow-xl">
            📄 Export Diagnostic Health Certificate (.txt)
          </button>
        </div>

        <!-- Workbench Studio Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left: Visual Interactive Viewport & Component Testing (8 cols) -->
          <div class="lg:col-span-8 space-y-4">
            
            <!-- Appliance Selector Tabs -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button 
                *ngFor="let mod of diagnosticModules"
                (click)="activeModule.set(mod); activeSymptomIndex.set(0)"
                [style.background-color]="activeModule().id === mod.id ? 'var(--color-primary)' : 'var(--bg-surface)'"
                [style.color]="activeModule().id === mod.id ? '#ffffff' : 'var(--text-muted)'"
                class="px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border border-[var(--border-subtle)] transition-all shadow-sm flex items-center gap-2">
                <span>🔧</span>
                <span>{{ mod.name }}</span>
              </button>
            </div>

            <!-- Viewport Container with Dynamic Diagnostic HUD Overlay -->
            <div class="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-medium)] bg-zinc-950 select-none group">
              
              <!-- Base Appliance Image -->
              <img 
                [src]="activeModule().baseImage" 
                [alt]="activeModule().name"
                class="w-full h-full object-cover transition-all duration-700"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

              <!-- Top Status HUD Bar -->
              <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div class="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>SYSTEM DIAGNOSTIC ACTIVE: {{ activeModule().category }}</span>
                </div>

                <span class="badge-pill bg-emerald-500/20 text-emerald-300 backdrop-blur-md border border-emerald-500/30 text-xs font-mono font-bold">
                  90-Min Dispatch
                </span>
              </div>

              <!-- Interactive Hotspot Targets on Appliance -->
              <div class="absolute inset-0 flex items-center justify-around pointer-events-none p-12">
                <div 
                  *ngFor="let sym of activeModule().symptoms; let idx = index"
                  (click)="activeSymptomIndex.set(idx)"
                  class="pointer-events-auto cursor-pointer group/pin flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
                  [class.scale-110]="activeSymptomIndex() === idx">
                  
                  <div 
                    [style.background-color]="activeSymptomIndex() === idx ? 'var(--color-secondary)' : 'rgba(0, 0, 0, 0.8)'"
                    class="w-10 h-10 rounded-full border-2 border-white shadow-2xl flex items-center justify-center text-white text-xs font-bold font-mono">
                    {{ idx + 1 }}
                  </div>

                  <span class="bg-black/80 backdrop-blur-md text-white text-[0.65rem] px-2 py-0.5 rounded border border-white/20 font-bold whitespace-nowrap">
                    {{ sym.part }}
                  </span>
                </div>
              </div>

              <!-- Bottom Active Diagnostic Result Banner -->
              <div class="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="badge-pill badge-flame text-[0.7rem] font-bold">
                      Checkpoint {{ activeSymptomIndex() + 1 }} of {{ activeModule().symptoms.length }}
                    </span>
                    <span class="text-xs text-amber-300 font-mono font-bold">
                      {{ currentSymptom.part }}
                    </span>
                  </div>
                  <h3 class="font-serif text-lg sm:text-xl font-bold">
                    {{ currentSymptom.commonFailure }}
                  </h3>
                  <p class="text-xs text-zinc-300 max-w-xl">
                    Fix Action: {{ currentSymptom.fixAction }}
                  </p>
                </div>

                <div class="flex items-center gap-3">
                  <div class="bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-right">
                    <div class="text-[0.65rem] text-zinc-400 font-mono">Est. Fix Rate</div>
                    <div class="text-lg font-mono font-extrabold text-amber-400">₹{{ currentSymptom.estCostINR }}</div>
                  </div>
                </div>

              </div>

            </div>

            <div class="text-xs text-[var(--text-light)] flex items-center justify-between">
              <span>* Click on numbers 1, 2, 3 to inspect specific subsystem diagnostics</span>
              <span class="font-mono font-bold">SULTAN DIAGNOSTIC ENGINE</span>
            </div>

          </div>

          <!-- Right: Diagnostic Details & Quick Booking (4 cols) -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- Active Subsystem Card -->
            <div class="glass-panel p-6 rounded-3xl space-y-5 shadow-sm border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <div class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h4 class="font-serif text-base font-bold text-[var(--text-main)]">
                  Subsystem Diagnosis
                </h4>
                <span class="text-xs font-mono font-bold text-[var(--color-secondary)]">
                  {{ currentSymptom.part }}
                </span>
              </div>

              <!-- Component Checkpoints List -->
              <div class="space-y-2">
                <button 
                  *ngFor="let sym of activeModule().symptoms; let idx = index"
                  (click)="activeSymptomIndex.set(idx)"
                  [style.border-color]="activeSymptomIndex() === idx ? 'var(--color-secondary)' : 'var(--border-subtle)'"
                  [style.background-color]="activeSymptomIndex() === idx ? 'var(--color-secondary-light)' : 'transparent'"
                  class="w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left group">
                  <div class="space-y-0.5">
                    <div class="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                      <span class="text-[0.68rem] text-[var(--color-secondary)] font-mono">#{{ idx + 1 }}</span>
                      <span>{{ sym.part }}</span>
                    </div>
                    <div class="text-[0.7rem] text-[var(--text-muted)] truncate max-w-[210px]">{{ sym.commonFailure }}</div>
                  </div>
                  <span class="text-xs font-mono font-extrabold text-[var(--text-main)]">₹{{ sym.estCostINR }}</span>
                </button>
              </div>

              <!-- Action -->
              <div class="pt-3 border-t border-[var(--border-subtle)] space-y-2">
                <a 
                  [href]="'https://wa.me/918076224170?text=' + getDiagnosticBookingMsg()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-flame w-full py-3 text-xs uppercase tracking-wider shadow-lg text-center">
                  💬 Book Technician for {{ currentSymptom.part }}
                </a>
              </div>

            </div>

            <!-- Multi-Brand Repair Guarantee -->
            <div class="glass-panel p-5 rounded-2xl border border-[var(--border-subtle)] space-y-2 text-xs text-[var(--text-muted)] bg-[var(--bg-surface)]">
              <strong class="text-[var(--text-main)] block font-serif text-sm">Official Service Guarantee</strong>
              <p class="leading-relaxed">
                Includes electronic sniffer safety gas audit, 100% genuine brand OEM spares, and our 90-Day Full Service Assurance.
              </p>
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
export class RoomVisualizerComponent {
  downloadService = inject(DownloadService);

  readonly diagnosticModules: DiagnosticModule[] = [
    {
      id: 'diag-hob',
      name: 'Built-in Gas Hob & Burners',
      category: 'Gas Combustion & Pulse Spark Engine',
      baseImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=90',
      symptoms: [
        { part: 'Auto-Ignition Pulse Box', normalStatus: '12kV Instant Spark', commonFailure: 'Continuous Clicking / Zero Spark', fixAction: 'Replace 1.5V pulse generator & micro-switch harness', estCostINR: 399 },
        { part: 'Brass Injector & Jet', normalStatus: '68% Thermal Blue Flame', commonFailure: 'Sluggish Yellow Flame & Utensil Soot', fixAction: 'Ultrasonic carbon descaling & precision jet micro-reaming', estCostINR: 499 },
        { part: 'Flame Failure Device (FFD)', normalStatus: '2-Sec Safety Retention', commonFailure: 'Flame Cuts Off After Releasing Knob', fixAction: 'Thermocouple recalibration and valve seat sealing', estCostINR: 599 }
      ]
    },
    {
      id: 'diag-chimney',
      name: 'Kitchen Chimney & Exhaust Hood',
      category: 'Centrifugal Airflow & Inverter Motor',
      baseImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=90',
      symptoms: [
        { part: 'Centrifugal Blower Fan', normalStatus: '1500 m³/hr Extraction', commonFailure: 'Severe Suction Drop & Oil Dripping', fixAction: 'High-pressure chemical wash & grease de-sludging', estCostINR: 799 },
        { part: 'Inverter BLDC Motor', normalStatus: 'Whisper 45dB Operation', commonFailure: 'Loud Grinding Noise & Vibration', fixAction: 'Sealed ball bearing replacement & copper winding overhaul', estCostINR: 899 },
        { part: 'Gesture Sensor PCB', normalStatus: 'Instant Wave Response', commonFailure: 'Touchscreen Unresponsive / Dead Power', fixAction: 'Micro-soldering sensor receiver board and relay swap', estCostINR: 699 }
      ]
    },
    {
      id: 'diag-oven',
      name: 'Built-in Convection Oven',
      category: 'Thermal Heating & Convection Suite',
      baseImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1400&q=90',
      symptoms: [
        { part: '4D HotAir Heating Coil', normalStatus: 'Uniform 250°C Baking', commonFailure: 'Oven Trips MCB / Element Burnout', fixAction: 'Install genuine 2800W Incoloy heating element', estCostINR: 899 },
        { part: 'Digital NTC Thermistor', normalStatus: 'Precision ±2°C Reading', commonFailure: 'Uneven Baking & Temperature Drift', fixAction: 'Digital thermal probe recalibration & sensor swap', estCostINR: 599 },
        { part: 'Cool-Touch Door Seal', normalStatus: 'Zero Heat Escape', commonFailure: 'Loose Silicone Gasket & Hot Outer Glass', fixAction: 'Fit factory-grade high-temperature silicone seal', estCostINR: 499 }
      ]
    }
  ];

  activeModule = signal(this.diagnosticModules[0]);
  activeSymptomIndex = signal(0);

  get currentSymptom() {
    return this.activeModule().symptoms[this.activeSymptomIndex()] || this.activeModule().symptoms[0];
  }

  getDiagnosticBookingMsg(): string {
    return encodeURIComponent(`Hello Sultan Appliances, I ran the online diagnostic for ${this.activeModule().name} and need technician service for ${this.currentSymptom.part} (Issue: ${this.currentSymptom.commonFailure}).`);
  }

  downloadDiagnosticReport(): void {
    const mod = this.activeModule();
    const sym = this.currentSymptom;
    const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const certId = 'SULTAN-DIAG-' + Math.floor(100000 + Math.random() * 900000);

    const reportContent = `
================================================================================
     SULTAN HOME APPLIANCES — ONLINE APPLIANCE DIAGNOSTIC HEALTH REPORT
================================================================================
Report Reference    : ${certId}
Date of Diagnostic  : ${dateStr}
Appliance Tested    : ${mod.name}
Subsystem Category  : ${mod.category}

--------------------------------------------------------------------------------
CHECKPOINT FAULT DIAGNOSIS:
--------------------------------------------------------------------------------
- Inspected Component : ${sym.part}
- Standard Operating  : ${sym.normalStatus}
- Observed Symptom    : ${sym.commonFailure}
- Recommended Repair  : ${sym.fixAction}
- Estimated Fix Cost  : ₹${sym.estCostINR} (Inclusive of Sniffer Gas Audit)

--------------------------------------------------------------------------------
SERVICE & SAFETY RECOMMENDATION:
--------------------------------------------------------------------------------
- Certified technician visit recommended within 90-120 minutes.
- Multi-point electronic gas leakage audit will be conducted on arrival.
- 100% Genuine OEM Spares with 1-Year Guarantee.
- 90-Day Full Service Warranty on all repairs.

================================================================================
Sultan Home Appliances 24/7 Helpline: 8076224170
WhatsApp Direct Desk: https://wa.me/918076224170
================================================================================
`;

    this.downloadService.downloadTextFile(reportContent, `${certId}_Appliance_Diagnostic_Report.txt`);
  }
}
