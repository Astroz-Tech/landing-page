const entities: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
};

export function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&(lt|gt|quot|#39|#x27);/g, (match) => entities[match] ?? match)
    .replace(/&amp;/g, "&");
}
