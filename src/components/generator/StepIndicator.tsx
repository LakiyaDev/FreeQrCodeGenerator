import { Check, ChevronRight } from 'lucide-react';

export type WizardStep = 1 | 2 | 3;

interface StepIndicatorProps {
  currentStep: WizardStep;
}

const STEPS = [
  { num: 1, label: 'Choose Type', shortLabel: 'Type' },
  { num: 2, label: 'Add content', shortLabel: 'Content' },
  { num: 3, label: 'Customize QR design', shortLabel: 'Design' },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const current = STEPS.find((step) => step.num === currentStep);

  return (
    <nav aria-label="QR creation progress" className="w-full">
      <p className="mb-2 text-center text-xs font-medium text-slate-500 sm:hidden">
        Step {currentStep} of 3 · {current?.shortLabel}
      </p>
      <div className="flex items-center justify-center gap-1.5 sm:gap-4">
        {STEPS.map((step, i) => {
          const isComplete = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <div key={step.num} className="flex items-center gap-1.5 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={[
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors sm:h-8 sm:w-8 sm:text-sm',
                    isComplete
                      ? 'bg-brand-600 text-white'
                      : isCurrent
                        ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                        : 'border-2 border-slate-200 bg-white text-slate-400',
                  ].join(' ')}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isComplete ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : step.num}
                </span>
                <span
                  className={[
                    'hidden text-sm font-medium md:inline',
                    isCurrent ? 'text-brand-700' : isComplete ? 'text-slate-700' : 'text-slate-400',
                  ].join(' ')}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-300 sm:h-4 sm:w-4" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
