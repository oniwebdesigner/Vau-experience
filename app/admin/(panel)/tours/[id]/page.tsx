import { notFound } from 'next/navigation';
import { TourForm } from '@/components/admin/TourForm';
import { getAdminTour } from '@/lib/tours';

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) notFound();
  const tour = await getAdminTour(id);
  if (!tour) notFound();
  return <TourForm tour={tour} />;
}
