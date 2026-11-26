import { LIMITS } from './tour-shared';

export type ImageMime = 'image/jpeg' | 'image/png' | 'image/webp';

/** Detects the real image type from the first bytes (the browser-supplied type is never trusted). */
export function sniffImage(bytes: Uint8Array): ImageMime | null {
  const buf = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.length > 12 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return 'image/png';
  }
  if (buf.length > 12 && buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') {
    return 'image/webp';
  }
  return null;
}

export interface Upload {
  data: Uint8Array<ArrayBuffer>;
  mimeType: ImageMime;
}

export async function readUploads(files: FormDataEntryValue[]): Promise<{ uploads: Upload[] } | { error: string }> {
  const uploads: Upload[] = [];
  for (const entry of files) {
    if (typeof entry === 'string') continue;
    if (entry.size > LIMITS.maxImageBytes) return { error: 'Një foto është shumë e madhe (maksimumi 5 MB).' };
    const data = new Uint8Array(await entry.arrayBuffer());
    const mimeType = sniffImage(data);
    if (!mimeType) return { error: 'Lejohen vetëm foto JPG, PNG ose WebP.' };
    uploads.push({ data, mimeType });
  }
  return { uploads };
}
