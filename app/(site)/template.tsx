'use client';

import { PageTransition } from '@/components/PageTransition';

// A template re-mounts on every navigation, which replays the soft page fade.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
