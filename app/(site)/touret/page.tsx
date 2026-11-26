import type { Metadata } from 'next';
import { Tours } from '@/views/Tours';
import { sq } from '@/i18n/sq';

export const metadata: Metadata = { title: sq.meta.tours.title, description: sq.meta.tours.description };

export default function Page() {
  return <Tours />;
}
