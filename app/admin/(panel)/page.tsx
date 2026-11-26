import { TourList } from '@/components/admin/TourList';
import { getAdminTours } from '@/lib/tours';

export default async function AdminHome() {
  const tours = await getAdminTours();
  return <TourList tours={tours} />;
}
