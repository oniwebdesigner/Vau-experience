import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAU Experience — Ture në Divjakë-Karavasta dhe në të gjithë Shqipërinë",
  description:
    "Përvoja autentike në të gjithë Shqipërinë, me zemër në Parkun Kombëtar Divjakë-Karavasta, me guida vendas të certifikuar.",
  applicationName: "VAU Experience",
};

export const viewport: Viewport = {
  themeColor: "#14403f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}
