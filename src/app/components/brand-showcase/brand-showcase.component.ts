import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteriorService } from '../../services/interior.service';
import { BrandName } from '../../models/interior.models';

@Component({
  selector: 'app-brand-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="brands" class="py-16 md:py-20 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div class="container-custom space-y-10">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
              <span>🛡️</span> Multi-Brand Certified Repair Specialist
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-main)]">
              Authorized Service for Top Cooking Appliance Brands
            </h2>
            <p class="text-sm sm:text-base text-[var(--text-muted)]">
              Expert repairs and deep descaling with 100% genuine factory-sealed OEM spare parts for European and Indian luxury cooking appliances.
            </p>
          </div>

          <div class="text-xs uppercase tracking-widest text-[var(--color-secondary)] font-mono font-bold">
            8 SPECIALIZED BRAND PARTNERS
          </div>
        </div>

        <!-- 8 Brands Cards Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div 
            *ngFor="let b of interiorService.brands"
            (click)="selectBrand.emit(b.name)"
            class="luxury-card p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] bg-[var(--bg-surface-card)] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group">
            
            <div class="space-y-3">
              <!-- Brand Badge Header -->
              <div class="flex items-center justify-between">
                <span class="text-[0.65rem] uppercase font-mono px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] font-semibold">
                  {{ b.origin }}
                </span>
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <!-- Brand Name Wordmark -->
              <div class="pt-2">
                <h3 class="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-[var(--text-main)] group-hover:text-[var(--color-secondary)] transition-colors">
                  {{ b.name }}
                </h3>
                <div class="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {{ b.badge }}
                </div>
              </div>

              <!-- Brand Specialty -->
              <p class="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                {{ b.specialty }}
              </p>
            </div>

            <!-- Warranty Note & Filter Trigger -->
            <div class="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-2">
              <div class="text-[0.7rem] text-[var(--text-light)] font-mono flex items-center gap-1.5">
                <span class="text-emerald-500 font-bold">✓</span>
                <span class="truncate">{{ b.warrantyAssurance }}</span>
              </div>
              <div class="text-xs font-bold text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View {{ b.name }} Repair Services →
              </div>
            </div>

          </div>
        </div>

        <!-- Trust Badges Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] flex items-center justify-center font-bold">✓</div>
            <div>
              <strong class="text-[var(--text-main)] block">Genuine OEM Spares</strong>
              <span>100% Brand Sealed Parts</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] flex items-center justify-center font-bold">⚡</div>
            <div>
              <strong class="text-[var(--text-main)] block">Doorstep in 90 Mins</strong>
              <span>Certified Expert Technicians</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] flex items-center justify-center font-bold">🛡️</div>
            <div>
              <strong class="text-[var(--text-main)] block">90-Day Guarantee</strong>
              <span>Full Service & Repair Warranty</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] flex items-center justify-center font-bold">💰</div>
            <div>
              <strong class="text-[var(--text-main)] block">Transparent Rate Card</strong>
              <span>No Hidden Extra Charges</span>
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
export class BrandShowcaseComponent {
  interiorService = inject(InteriorService);
  selectBrand = output<BrandName>();
}
