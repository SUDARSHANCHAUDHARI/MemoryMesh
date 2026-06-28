export function keywordScore(text: string, query: string): number {
  const haystack = text.toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0);
}
