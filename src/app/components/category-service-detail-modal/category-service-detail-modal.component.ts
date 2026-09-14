import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryInfo, RoomCategoryId } from '../../models/interior.models';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-category-service-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="category()"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      (click)="close.emit()">
      
      <div 
        class="bg-[var(--bg-surface)] text-[var(--text-main)] rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-[var(--border-gold)] p-5 sm:p-8 space-y-8"
        (click)="$event.stopPropagation()">
        
        <!-- 1. Modal Top Bar / Header -->
        <div class="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="badge-pill bg-[var(--color-primary)] text-white text-[0.7rem] font-bold">
                SULTAN EXPERT REPAIR SERVICE
              </span>
              <span class="badge-pill badge-flame text-[0.7rem] font-bold font-mono">
                ⚡ {{ category()!.turnaroundHours }}
              </span>
              <span class="badge-pill bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[0.7rem] font-bold">
                ✓ {{ category()!.warrantyCoverage }}
              </span>
            </div>

            <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-main)]">
              {{ category()!.name }}
            </h2>

            <p class="text-xs sm:text-sm text-[var(--text-muted)]">
              Specialized Doorstep Repair, Deep Chemical Cleaning & Genuine Spare Parts for <strong class="text-[var(--text-main)]">{{ category()!.topBrands.join(', ') }}</strong>
            </p>
          </div>

          <button 
            (click)="close.emit()"
            class="btn-icon text-lg flex-shrink-0"
            aria-label="Close modal">
            ✕
          </button>
        </div>

        <!-- 2. 4 TO 5 IMAGES SERVICE GALLERY SECTION -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] font-mono">
              📸 Technician Service & Repair Documentation Gallery ({{ category()!.images.length }} HD Photos)
            </span>
            <span class="text-[0.68rem] text-[var(--text-light)] hidden sm:inline">
              Click any photo to view in high resolution
            </span>
          </div>

          <!-- Main Active Image -->
          <div class="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-950 border border-[var(--border-medium)] shadow-lg group">
            <img 
              [src]="activeImage()" 
              [alt]="category()!.name + ' Repair Service Photo'"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span class="font-mono bg-black/70 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                Service Inspection View • {{ category()!.name }}
              </span>
              <button 
                (click)="downloadActiveImage()"
                class="btn-flame text-xs py-1.5 px-3.5 shadow-lg">
                📥 Download Photo (.jpg)
              </button>
            </div>
          </div>

          <!-- 4 to 5 Thumbnails Grid Strip -->
          <div class="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
            <div 
              *ngFor="let img of category()!.images; let idx = index"
              (click)="activeImage.set(img)"
              [class.ring-3]="activeImage() === img"
              [class.ring-[var(--color-secondary)]]="activeImage() === img"
              class="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-[var(--border-subtle)] cursor-pointer hover:opacity-85 transition-all shadow-sm">
              <img [src]="img" [alt]="'Photo ' + (idx + 1)" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <!-- 3. COMPREHENSIVE 30 TO 40 LINES SERVICE GUIDE & DOCUMENTATION -->
        <div class="space-y-4 bg-[var(--bg-surface-subtle)] p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)]">
          <div class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div class="flex items-center gap-2">
              <span class="text-xl">📄</span>
              <h3 class="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)]">
                Official Technical Repair Guide & Service Scope (35+ Lines)
              </h3>
            </div>
            <button 
              (click)="downloadFullGuideText()"
              class="btn-secondary text-xs py-1.5 px-3 font-bold"
              title="Download full 35-line service guide as .txt">
              📥 Export Text Guide
            </button>
          </div>

          <!-- 30 to 40 Lines Formatted Paragraphs -->
          <div class="space-y-3 font-mono text-xs sm:text-[0.82rem] text-[var(--text-muted)] leading-relaxed max-h-[340px] overflow-y-auto pr-2">
            <p 
              *ngFor="let line of category()!.detailedServiceGuide"
              [class.font-bold]="line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')"
              [class.text-[var(--text-main)]]="line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')"
              [class.pt-2]="line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')"
              [class.text-[var(--color-secondary)]]="line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')">
              {{ line }}
            </p>
          </div>
        </div>

        <!-- 4. TWO-COLUMN BREAKDOWN: COMMON ISSUES & 6-STEP REPAIR PROCESS -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left: 6-8 Common Problems Diagnosed (6 cols) -->
          <div class="lg:col-span-6 space-y-4 p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface-card)] border border-[var(--border-subtle)]">
            <div class="flex items-center gap-2">
              <span class="text-base">⚠️</span>
              <h4 class="font-serif text-base font-bold text-[var(--text-main)]">
                Common Symptoms & Problems Fixed
              </h4>
            </div>

            <ul class="space-y-2 text-xs text-[var(--text-muted)]">
              <li *ngFor="let issue of category()!.commonIssues" class="flex items-start gap-2">
                <span class="text-red-500 font-bold flex-shrink-0">✕</span>
                <span>{{ issue }}</span>
              </li>
            </ul>
          </div>

          <!-- Right: 6-Step Standard Operating Procedure (6 cols) -->
          <div class="lg:col-span-6 space-y-4 p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface-card)] border border-[var(--border-subtle)]">
            <div class="flex items-center gap-2">
              <span class="text-base">🛠️</span>
              <h4 class="font-serif text-base font-bold text-[var(--text-main)]">
                6-Stage Repair & Descaling Workflow
              </h4>
            </div>

            <div class="space-y-2.5 text-xs">
              <div *ngFor="let step of category()!.repairProcess" class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-bold text-[0.68rem] flex items-center justify-center flex-shrink-0 font-mono">
                  {{ step.step }}
                </span>
                <div>
                  <strong class="text-[var(--text-main)] block">{{ step.title }}</strong>
                  <span class="text-[var(--text-muted)] text-[0.72rem]">{{ step.desc }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 5. RATE CARD & MULTI-BRAND ASSURANCE -->
        <div class="p-5 rounded-2xl bg-gradient-to-r from-zinc-950 via-[#181a20] to-zinc-950 text-white border border-[var(--border-gold)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1 text-center sm:text-left">
            <div class="text-[0.68rem] uppercase tracking-wider text-amber-400 font-mono font-bold">
              Doorstep Inspection Starting From
            </div>
            <div class="flex items-baseline gap-2 justify-center sm:justify-start">
              <span class="font-mono text-3xl font-extrabold text-amber-400">
                ₹{{ category()!.servicePriceStartingINR }}
              </span>
              <span class="text-xs text-zinc-400 font-mono">(Includes Complete Safety Gas Audit)</span>
            </div>
            <div class="text-[0.72rem] text-zinc-300">
              Authorized Spares: Siemens • Bosch • Faber • Elica • Häfele • Gilma • Crompton • Hindware
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button 
              (click)="bookService.emit(category()!.id)"
              class="btn-flame py-3 px-6 text-xs uppercase tracking-wider shadow-xl whitespace-nowrap">
              📅 Book Technician Visit
            </button>
            <a 
              [href]="'tel:' + contactNumber"
              class="btn-secondary py-3 px-5 text-xs uppercase tracking-wider text-white border-white/30 hover:border-white whitespace-nowrap">
              📞 {{ contactNumber }}
            </a>
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
export class CategoryServiceDetailModalComponent {
  downloadService = inject(DownloadService);

  category = input<CategoryInfo | null>(null);
  close = output<void>();
  bookService = output<RoomCategoryId>();

  readonly contactNumber = '8076224170';

  activeImage = signal<string>('');

  ngOnChanges() {
    if (this.category() && this.category()!.images.length > 0) {
      this.activeImage.set(this.category()!.images[0]);
    }
  }

  async downloadActiveImage(): Promise<void> {
    if (!this.category()) return;
    const filename = `Sultan_Repair_Service_${this.category()!.id}_Photo.jpg`;
    await this.downloadService.downloadImage(this.activeImage(), filename);
  }

  downloadFullGuideText(): void {
    if (!this.category()) return;
    const cat = this.category()!;

    const textContent = `
================================================================================
  SULTAN HOME APPLIANCES — OFFICIAL TECHNICAL REPAIR & SERVICE MANUAL
================================================================================
SERVICE CATEGORY     : ${cat.name.toUpperCase()}
ESTIMATED TURNAROUND : ${cat.turnaroundHours}
WARRANTY ASSURANCE   : ${cat.warrantyCoverage}
STARTING INSPECTION  : ₹${cat.servicePriceStartingINR} (Doorstep Multi-Point Audit)
AUTHORIZED BRANDS    : ${cat.topBrands.join(', ')}

--------------------------------------------------------------------------------
COMPREHENSIVE 35-LINE TECHNICAL REPAIR SPECIFICATION:
--------------------------------------------------------------------------------
${cat.detailedServiceGuide.join('\n')}

--------------------------------------------------------------------------------
COMMON FAILURE MODES & SYMPTOMS DIAGNOSED:
--------------------------------------------------------------------------------
${cat.commonIssues.map((issue, idx) => `${idx + 1}. ${issue}`).join('\n')}

--------------------------------------------------------------------------------
6-STAGE STANDARD OPERATING REPAIR PROCEDURE:
--------------------------------------------------------------------------------
${cat.repairProcess.map(step => `Step ${step.step}: [${step.title}] -> ${step.desc}`).join('\n')}

================================================================================
SULTAN HOME APPLIANCES REPAIR & SERVICE CENTER
24/7 Hotline Support: 8076224170
Direct WhatsApp Desk: https://wa.me/918076224170
100% Genuine OEM Spares • Siemens • Bosch • Faber • Elica • Häfele • Gilma • Crompton • Hindware
================================================================================
`;

    this.downloadService.downloadTextFile(textContent, `Sultan_Repair_Manual_${cat.id}.txt`);
  }
}
