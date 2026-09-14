import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteriorService } from '../../services/interior.service';
import { DownloadService } from '../../services/download.service';
import { DesignStyle, StyleQuizResult } from '../../models/interior.models';

@Component({
  selector: 'app-style-quiz',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="quiz" class="py-20 md:py-28 bg-[var(--bg-surface)]">
      <div class="container-custom space-y-12">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
            <span>⭐</span> Appliance Troubleshooting Diagnostic
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-main)]">
            Troubleshoot Your Appliance in 3 Simple Steps
          </h2>
          <p class="text-base sm:text-lg text-[var(--text-muted)]">
            Identify the root cause of your cooking appliance fault, estimate the repair cost, and get instant technician scheduling advice.
          </p>
        </div>

        <!-- Quiz Container Box -->
        <div class="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl shadow-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)]">
          
          <!-- State 1: Active Questions -->
          <div *ngIf="!quizResult" class="space-y-8">
            
            <!-- Progress Bar & Step Indicator -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-[var(--text-muted)]">
                <span>Step {{ currentStepIndex + 1 }} of {{ totalSteps }}</span>
                <span class="font-mono text-[var(--color-secondary)]">{{ Math.round(((currentStepIndex + 1) / totalSteps) * 100) }}% Completed</span>
              </div>
              <div class="w-full h-2 rounded-full bg-[var(--bg-surface-subtle)] overflow-hidden">
                <div 
                  class="h-full bg-[var(--color-secondary)] transition-all duration-400 rounded-full"
                  [style.width.%]="((currentStepIndex + 1) / totalSteps) * 100">
                </div>
              </div>
            </div>

            <!-- Current Question -->
            <div class="space-y-2 text-center">
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
                {{ currentStep.question }}
              </h3>
              <p class="text-sm text-[var(--text-muted)]">
                {{ currentStep.subtitle }}
              </p>
            </div>

            <!-- 4 Visual Option Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button 
                *ngFor="let opt of currentStep.options"
                (click)="selectOption(opt.matchedStyle)"
                class="group p-4 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] bg-[var(--bg-surface)] hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between space-y-3">
                
                <div class="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950">
                  <img 
                    [src]="opt.image" 
                    [alt]="opt.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                </div>

                <div class="space-y-1">
                  <div class="font-serif text-base font-bold text-[var(--text-main)] group-hover:text-[var(--color-secondary)] transition-colors">
                    {{ opt.title }}
                  </div>
                  <div class="text-xs text-[var(--text-muted)] leading-relaxed">
                    {{ opt.description }}
                  </div>
                </div>

              </button>
            </div>

            <!-- Navigation Controls -->
            <div class="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <button 
                *ngIf="currentStepIndex > 0"
                (click)="currentStepIndex = currentStepIndex - 1"
                class="btn-secondary text-xs py-2.5 px-4 font-bold">
                ← Back
              </button>
              <div *ngIf="currentStepIndex === 0"></div>

              <span class="text-xs text-[var(--text-light)]">Click any option to proceed</span>
            </div>

          </div>

          <!-- State 2: Quiz Result Screen -->
          <div *ngIf="quizResult" class="space-y-8 animate-fade-in">
            
            <div class="text-center space-y-3">
              <span class="badge-pill badge-flame text-xs font-bold">Diagnosed Repair Solution</span>
              <h3 class="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-main)]">
                {{ quizResult.title }}
              </h3>
              <p class="text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
                {{ quizResult.description }}
              </p>
            </div>

            <!-- Result Hero Banner & Signature Swatches -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div class="md:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-[var(--border-medium)] bg-zinc-950">
                <img 
                  [src]="quizResult.bannerImage" 
                  [alt]="quizResult.title"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="md:col-span-5 space-y-5 bg-[var(--bg-surface-subtle)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                
                <!-- Signature Elements -->
                <div class="space-y-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)] block">Recommended Technical Actions</span>
                  <ul class="space-y-1.5 text-xs text-[var(--text-muted)] font-medium">
                    <li *ngFor="let el of quizResult.keyElements" class="flex items-center gap-2">
                      <span class="text-[var(--color-secondary)] font-bold">✓</span> {{ el }}
                    </li>
                  </ul>
                </div>

                <!-- Emergency Dispatch Badge -->
                <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  ⚡ Doorstep technician dispatch available within 90 minutes. 90-Day Full Service Warranty.
                </div>

              </div>

            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
              <button 
                (click)="restartQuiz()"
                class="btn-secondary text-xs py-2.5 px-5 font-bold">
                🔄 Retake Diagnostic
              </button>

              <div class="flex items-center gap-3">
                <a 
                  [href]="'https://wa.me/918076224170?text=' + getBookingMsg()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-flame text-xs py-2.5 px-5 shadow-lg">
                  💬 Book This Repair on WhatsApp
                </a>
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
export class StyleQuizComponent {
  interiorService = inject(InteriorService);
  downloadService = inject(DownloadService);
  filterGalleryByStyle = output<DesignStyle>();

  Math = Math;
  currentStepIndex = 0;
  answers: DesignStyle[] = [];
  quizResult: StyleQuizResult | null = null;

  get totalSteps(): number {
    return this.interiorService.styleQuizSteps.length;
  }

  get currentStep() {
    return this.interiorService.styleQuizSteps[this.currentStepIndex];
  }

  selectOption(style: DesignStyle) {
    this.answers.push(style);

    if (this.currentStepIndex < this.totalSteps - 1) {
      this.currentStepIndex++;
    } else {
      this.quizResult = this.interiorService.evaluateQuiz(this.answers);
    }
  }

  restartQuiz() {
    this.currentStepIndex = 0;
    this.answers = [];
    this.quizResult = null;
  }

  getBookingMsg(): string {
    if (!this.quizResult) return '';
    return encodeURIComponent(`Hello Sultan Appliances, I ran the online diagnostic and need technician service for: ${this.quizResult.title}.`);
  }
}
