import { Sparkles } from 'lucide-react';
import { ContentTypeGrid } from '@/components/generator/ContentTypeGrid';
import { StepIndicator } from '@/components/generator/StepIndicator';

/** Home page type picker — compact top layout, grid + phone mockup. */
export function ChooseTypeSection() {
  return (
    <section
      id="choose-type"
      aria-labelledby="choose-type-heading"
      className="scroll-mt-20 bg-slate-50 pt-6 pb-12 sm:pt-8 sm:pb-16"
    >
      <div className="mx-auto w-full max-w-[2560px] px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Title — full width above grid */}
          <div className="mb-4 sm:mb-5">
            <span className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-600 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              The best QR code generator
            </span>
            <h2
              id="choose-type-heading"
              className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem] xl:text-4xl"
            >
              Create your QR code in seconds
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-snug text-slate-600 sm:text-base">
              Pick a content type below — each QR code encodes your data directly and never
              expires.
            </p>
          </div>

          {/* Grid + phone — vertically centered as a pair */}
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_min(280px,26%)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_min(300px,24%)] xl:gap-12">
            <ContentTypeGrid />

            <div className="hidden lg:flex lg:items-center lg:justify-center xl:justify-end">
              <img
                src="/images/choose-type-preview.png"
                alt="Select a type of QR Code from the left column"
                className="h-auto w-full max-h-[480px] max-w-[240px] object-contain object-center xl:max-h-[520px] xl:max-w-[280px]"
                width={280}
                height={560}
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 sm:mt-12">
            <StepIndicator currentStep={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
