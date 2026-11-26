import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';
import { adminConfigured, isAdmin } from '@/lib/auth';

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin');
  const configured = adminConfigured();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <p className="label text-ink-soft">VAU Experience</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em]">Paneli i menaxhimit</h1>
      {configured ? (
        <LoginForm />
      ) : (
        <p className="mt-8 rounded-media border border-clay/40 bg-white p-4 text-[15px] leading-relaxed text-clay-deep">
          Paneli nuk është konfiguruar ende. Vendosni variablat <strong>ADMIN_PASSWORD</strong> dhe{' '}
          <strong>AUTH_SECRET</strong> në server dhe nisni sërish aplikacionin.
        </p>
      )}
    </main>
  );
}
