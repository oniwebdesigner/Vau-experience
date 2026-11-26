import type { Metadata } from 'next';
import { Premium } from '@/views/Premium';
import { sq } from '@/i18n/sq';

export const metadata: Metadata = { title: sq.meta.premium.title, description: sq.meta.premium.description };

export default function Page() {
  return <Premium />;
}
