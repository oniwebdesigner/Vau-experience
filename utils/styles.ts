export type ButtonVariant =
  | 'primary'
  | 'clay'
  | 'sand'
  | 'outline'
  | 'outlineLight'
  | 'gold'
  | 'goldOutline';

const base =
  'inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[13px] font-medium tracking-[0.04em] transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:h-4 [&_svg]:w-4';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-lagoon text-sand hover:bg-lagoon-deep',
  clay: 'bg-clay text-sand hover:bg-clay-deep',
  sand: 'bg-sand text-ink hover:bg-sand-paper',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-sand',
  outlineLight: 'border border-sand/40 text-sand hover:border-sand hover:bg-sand hover:text-ink',
  gold: 'bg-gold text-lagoon-night hover:bg-gold-soft',
  goldOutline: 'border border-gold/50 text-gold hover:border-gold hover:bg-gold hover:text-lagoon-night',
};

export function buttonClasses(variant: ButtonVariant = 'primary', extra = ''): string {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

export const fieldClasses =
  'block w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[15px] text-ink placeholder:text-ink/40 transition-colors duration-200 focus:border-lagoon focus:outline-none focus-visible:outline-none';
