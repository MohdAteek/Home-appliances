import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="why-choose-us" class="py-20 md:py-28 bg-[var(--bg-surface-subtle)] border-y border-[var(--border-subtle)]">
      <div class="container-custom space-y-16">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
            <span>⭐</span> The OmniAppliances Repair Advantage
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)]">
            Why Choose OmniAppliances Kitchen Appliance Repair?
          </h2>
          <p class="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            With 15+ years of dedicated cooking appliance service expertise, we provide certified doorstep repairs, electronic gas leak audits, and genuine brand replacement spares.
          </p>
        </div>

        <!-- 4 Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Pillar 1: Genuine Spares -->
          <div class="luxury-card p-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--color-secondary)] hover:shadow-xl transition-all duration-300 space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl font-bold">
              🛡️
            </div>
            <h3 class="font-serif text-xl font-bold text-[var(--text-main)]">
              100% Genuine OEM Spares
            </h3>
            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
              We exclusively use factory-certified brass valves, ignition coils, heating elements, blowers, and thermocouples for Siemens, Bosch, Faber, Elica, Gilma, Häfele, Crompton, and Hindware.
            </p>
            <div class="pt-2 text-xs font-mono text-[var(--color-secondary)] font-bold">
              ✓ 1-Year Spare Part Warranty
            </div>
          </div>

          <!-- Pillar 2: 90-Min Dispatch -->
          <div class="luxury-card p-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--color-secondary)] hover:shadow-xl transition-all duration-300 space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-bold">
              ⚡
            </div>
            <h3 class="font-serif text-xl font-bold text-[var(--text-main)]">
              Doorstep Service in 90 Mins
            </h3>
            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
              Our mobile service vans are equipped with diagnostic meters, micro-reaming tools, and universal spare inventory for same-day on-the-spot repair completion.
            </p>
            <div class="pt-2 text-xs font-mono text-[var(--color-secondary)] font-bold">
              ✓ Emergency Gas Leak Response
            </div>
          </div>

          <!-- Pillar 3: Certified Technicians & Safety -->
          <div class="luxury-card p-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--color-secondary)] hover:shadow-xl transition-all duration-300 space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold">
              🔍
            </div>
            <h3 class="font-serif text-xl font-bold text-[var(--text-main)]">
              Multi-Point Safety Gas Audit
            </h3>
            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
              Every hob and gas stove repair includes an electronic sniffer test for micro-leakages, pressure decay inspection, and burner aeration calibration for a 100% soot-free blue flame.
            </p>
            <div class="pt-2 text-xs font-mono text-[var(--color-secondary)] font-bold">
              ✓ Zero Gas Leakage Guarantee
            </div>
          </div>

          <!-- Pillar 4: Transparent Rates & Warranty -->
          <div class="luxury-card p-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--color-secondary)] hover:shadow-xl transition-all duration-300 space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl font-bold">
              💰
            </div>
            <h3 class="font-serif text-xl font-bold text-[var(--text-main)]">
              Fixed ₹399 Service Charge & 90-Day Guarantee
            </h3>
            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
              Transparent upfront diagnostic quotations starting from just ₹399 doorstep inspection. No hidden charges. All service and labor is backed by our comprehensive 90-Day service warranty.
            </p>
            <div class="pt-2 text-xs font-mono text-[var(--color-secondary)] font-bold">
              ✓ 90-Day Full Service Cover
            </div>
          </div>

        </div>

        <!-- Emergency Banner -->
        <div class="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-[var(--border-gold)]">
          <div class="space-y-2 text-center md:text-left">
            <span class="badge-pill bg-[var(--color-secondary)]/20 text-amber-300 text-xs">Emergency Kitchen Cooking Service</span>
            <h3 class="font-serif text-2xl sm:text-3xl font-bold">
              Smelling Gas Leak or Chimney Stopped Working?
            </h3>
            <p class="text-xs sm:text-sm text-zinc-300 max-w-xl">
              Call our master technician helpline immediately for emergency doorstep dispatch within 90 minutes.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <a 
              [href]="'tel:8088034849'" 
              class="btn-flame py-3 px-6 text-xs uppercase tracking-wider whitespace-nowrap shadow-xl">
              📞 Call Hotline 8088034849
            </a>
            <button 
              (click)="openConsultation.emit()" 
              class="btn-secondary py-3 px-6 text-xs uppercase tracking-wider whitespace-nowrap text-white border-white/30 hover:border-white">
              📅 Book Technician Online
            </button>
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
export class WhyChooseUsComponent {
  openConsultation = output<void>();
}
