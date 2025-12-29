let registered = false;

export async function ensureImageResize() {
  if (registered) return;
  const Quill = (await import('quill')).default;
  if (typeof window !== 'undefined') window.Quill = Quill;
  const mod = await import('quill-image-resize-module');
  const ImageResize = mod.default || mod;
  Quill.register('modules/imageResize', ImageResize);
  registered = true;
}
