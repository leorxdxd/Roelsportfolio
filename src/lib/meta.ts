const DEFAULT_TITLE = document.title;
const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
const DEFAULT_DESC = descTag?.content ?? "";

/** Updates <title> and meta description for client-side pages. */
export function setPageMeta(title?: string, description?: string) {
  document.title = title ? `${title} | Roel Delos Reyes` : DEFAULT_TITLE;
  if (descTag) descTag.content = description ?? DEFAULT_DESC;
}
