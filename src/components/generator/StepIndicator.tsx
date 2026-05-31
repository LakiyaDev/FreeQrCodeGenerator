import { Check, ChevronRight } from 'lucide-react';

export type WizardStep = 1 | 2 | 3;

interface StepIndicatorProps {
  currentStep: WizardStep;
}

const STEPS = [
  { num: 1, label: 'Choose Type' },
  { num: 2, label: 'Add content' },
  { num: 3, label: 'Customize QR design' },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="QR creation progress" className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, i) => {
        const isComplete = currentStep > step.num;
        const isCurrent = currentStep === step.num;

        return (
          <div key={step.num} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  isComplete
                    ? 'bg-brand-600 text-white'
                    : isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                      : 'border-2 border-slate-200 bg-white text-slate-400',
                ].join(' ')}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isComplete ? <Check className="h-4 w-4" /> : step.num}
              </span>
              <span
                className={[
                  'hidden text-sm font-medium sm:inline',
                  isCurrent ? 'text-brand-700' : isComplete ? 'text-slate-700' : 'text-slate-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <ChevronRight className="h-4 w-4 text-slate-300" aria-hidden />
            )}
          </div>
        );
      })}
    </nav>
  );
}
