import type { Metadata } from 'next';
import { Home } from '@/views/Home';
import { sq } from '@/i18n/sq';

export const metadata: Metadata = { title: sq.meta.home.title, description: sq.meta.home.description };

export default function Page() {
  return <Home />;
}
