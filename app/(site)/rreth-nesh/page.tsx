import type { Metadata } from 'next';
import { About } from '@/views/About';
import { sq } from '@/i18n/sq';

export const metadata: Metadata = { title: sq.meta.about.title, description: sq.meta.about.description };

export default function Page() {
  return <About />;
}
