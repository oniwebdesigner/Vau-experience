/** Shared class names for the admin panel (kept plain so the panel stays light and fast). */
export const inputCls =
  'block w-full rounded-[6px] border border-ink/20 bg-white px-3 py-2.5 text-[15px] text-ink placeholder:text-ink/35 transition-colors focus:border-lagoon focus:outline-2 focus:outline-lagoon/25 disabled:opacity-60';

export const labelCls = 'mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-soft';

const btnBase =
  'inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[13px] font-medium tracking-[0.03em] transition-colors disabled:cursor-not-allowed disabled:opacity-60';

export const btn = {
  primary: `${btnBase} bg-lagoon text-sand hover:bg-lagoon-deep`,
  outline: `${btnBase} border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-sand`,
  danger: `${btnBase} border border-clay/50 text-clay-deep hover:bg-clay hover:text-sand`,
  small: 'inline-flex h-8 items-center justify-center rounded-full border border-ink/20 px-3 text-[12px] font-medium text-ink transition-colors hover:border-ink disabled:opacity-50',
};

export const cardCls = 'rounded-media border border-ink/12 bg-white';
