import { MessageList } from '@/components/admin/MessageList';
import { prisma } from '@/lib/prisma';

const formatter = new Intl.DateTimeFormat('sq-AL', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Tirane' });

export default async function MessagesPage() {
  const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 300 });
  return (
    <MessageList
      messages={rows.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        tour: m.tour,
        date: m.date,
        guests: m.guests,
        message: m.message,
        lang: m.lang,
        read: m.read,
        createdAt: formatter.format(m.createdAt),
      }))}
    />
  );
}
