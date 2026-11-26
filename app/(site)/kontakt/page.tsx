import type { Metadata } from 'next';
import { Contact } from '@/views/Contact';
import { sq } from '@/i18n/sq';

export const metadata: Metadata = { title: sq.meta.contact.title, description: sq.meta.contact.description };

export default function Page() {
  return <Contact />;
}
