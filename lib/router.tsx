'use client';

/**
 * Small adapter that keeps the design's react-router style API (`to`, `NavLink`,
 * `useLocation`, `useSearchParams`) on top of the Next.js App Router, so the approved
 * design components did not have to be rewritten.
 */
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';
import { useCallback, type ComponentProps, type ReactNode } from 'react';

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & { to: string };

export function Link({ to, ...rest }: LinkProps) {
  return <NextLink href={to} {...rest} />;
}

interface NavLinkState {
  isActive: boolean;
}

type NavLinkProps = Omit<ComponentProps<typeof NextLink>, 'href' | 'className' | 'children'> & {
  to: string;
  end?: boolean;
  className?: string | ((state: NavLinkState) => string);
  children?: ReactNode | ((state: NavLinkState) => ReactNode);
};

export function NavLink({ to, end = false, className, children, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
  const state = { isActive };
  return (
    <NextLink
      href={to}
      aria-current={isActive ? 'page' : undefined}
      className={typeof className === 'function' ? className(state) : className}
      {...rest}
    >
      {typeof children === 'function' ? children(state) : children}
    </NextLink>
  );
}

export function useLocation() {
  return { pathname: usePathname() };
}

export function useSearchParams(): [
  URLSearchParams,
  (next: Record<string, string>, options?: { replace?: boolean }) => void,
] {
  const params = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const setParams = useCallback(
    (next: Record<string, string>, options?: { replace?: boolean }) => {
      const qs = new URLSearchParams(next).toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (options?.replace) router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    },
    [pathname, router],
  );
  return [new URLSearchParams(params.toString()), setParams];
}
