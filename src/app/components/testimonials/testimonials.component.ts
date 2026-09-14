import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  appliancePurchased: string;
  brand: string;
  review: string;
  avatar: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="py-20 md:py-28 bg-[var(--bg-surface-subtle)] border-y border-[var(--border-subtle)]">
      <div class="container-custom space-y-14">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
            <span>⭐</span> Verified Customer Reviews
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)]">
            Trusted by 10,000+ Happy Kitchens
          </h2>
          <p class="text-base sm:text-lg text-[var(--text-muted)]">
            Read authentic feedback from homeowners, culinary chefs, and restaurants who rely on Sultan Home Appliances for emergency repairs and deep servicing.
          </p>
        </div>

        <!-- 3 Testimonials Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            *ngFor="let t of testimonials"
            class="luxury-card p-7 sm:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--color-secondary)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            
            <div class="space-y-4">
              <!-- Rating Stars & Verified Badge -->
              <div class="flex items-center justify-between">
                <div class="text-amber-500 text-sm font-bold tracking-wider">
                  ★★★★★
                </div>
                <span class="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                  <span>✓</span> Verified Service
                </span>
              </div>

              <!-- Product Badge -->
              <div class="text-xs font-mono text-[var(--color-secondary)] font-bold">
                Repair: {{ t.appliancePurchased }}
              </div>

              <!-- Review Text -->
              <p class="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed italic">
                "{{ t.review }}"
              </p>
            </div>

            <!-- Customer Profile -->
            <div class="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <img 
                [src]="t.avatar" 
                [alt]="t.name" 
                class="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--color-secondary)]/30"
              />
              <div>
                <div class="font-serif text-sm font-bold text-[var(--text-main)]">{{ t.name }}</div>
                <div class="text-[0.7rem] text-[var(--text-muted)]">{{ t.role }} • {{ t.location }}</div>
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
export class TestimonialsComponent {
  readonly testimonials: Testimonial[] = [
    {
      id: 'test-01',
      name: 'Dr. Radhika Menon',
      role: 'Homeowner',
      location: 'Bengaluru',
      rating: 5,
      appliancePurchased: 'Bosch Hob Ignition & Faber Chimney Chemical Descaling',
      brand: 'Bosch & Faber',
      review: 'Our Faber chimney was making heavy vibration noise and suction had completely stopped. Sultan Appliances sent a technician within 75 minutes. He disassembled the blower, did a full chemical wash, and replaced the noisy bearings. It now runs completely silent!',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-02',
      name: 'Chef Tarun Kapoor',
      role: 'Culinary Consultant',
      location: 'Delhi NCR',
      rating: 5,
      appliancePurchased: 'Siemens iQ700 Oven Heating Element & Hob Jet Reaming',
      brand: 'Siemens',
      review: 'My Siemens built-in oven tripped the circuit breaker right before a major dinner catering prep. Sultan Home Appliances diagnosed the open heating coil, replaced it with original German Incoloy spares on-site, and calibrated the thermostat to perfection.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-03',
      name: 'Ananya Deshmukh',
      role: 'Modular Kitchen Architect',
      location: 'Mumbai',
      rating: 5,
      appliancePurchased: 'Elica Silent Hood PCB Repair & Häfele FFD Valve Service',
      brand: 'Elica & Häfele',
      review: 'I rely on Sultan Appliances for all my client kitchen maintenance and annual service contracts. Their gas leak sniffer audits give clients immense safety confidence, and their 90-minute doorstep response is unbeatable.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  ];
}
