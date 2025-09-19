/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Generate a filename-safe string from business name
 */
export function generateFilename(businessName: string, extension: string = ''): string {
  const slug = slugify(businessName);
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${slug}-${timestamp}${extension}`;
}

/**
 * Generate a safe ID for HTML elements
 */
export function generateId(text: string): string {
  const slug = slugify(text);
  // Ensure it starts with a letter
  return slug.match(/^[a-z]/) ? slug : `id-${slug}`;
}

/**
 * Convert text to title case
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
