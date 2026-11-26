'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { BookingPanel } from './BookingPanel';
import { useBooking } from '../../contexts/BookingContext';
import { useTours } from '../../contexts/ToursContext';

export function BookingModal() {
  const { request, closeBooking } = useBooking();
  const { bookableTours } = useTours();
  const [shown, setShown] = useState(request);

  useEffect(() => {
    if (request) setShown(request);
  }, [request]);

  return (
    <Modal open={request !== null} onClose={closeBooking} labelledBy="booking-title" variant="sheet" className="max-w-6xl">
      {shown && bookableTours.length > 0 && <BookingPanel key={shown.key} initialTourId={shown.tourId} onClose={closeBooking} />}
    </Modal>
  );
}
