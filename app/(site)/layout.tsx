import { SiteProviders } from '@/components/SiteProviders';
import { getPublicTours } from '@/lib/tours';

// Tours come from the database, so these pages are rendered on every request.
export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { tours, premiumTours } = await getPublicTours();
  return (
    <SiteProviders tours={tours} premiumTours={premiumTours}>
      {children}
    </SiteProviders>
  );
}
