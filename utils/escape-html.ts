/**
 * HTML 특수 문자를 안전하게 이스케이프 처리
 *
 * @param text - 이스케이프할 문자열
 * @returns 이스케이프된 문자열
 *
 * @example
 * const unsafeString = '<script>alert("XSS")</script>';
 * const safeString = escapeHTML(unsafeString);
 * console.log(safeString); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
 *
 * @example
 * const userInput = "O'Reilly & Associates";
 * const safeInput = escapeHTML(userInput);
 * console.log(safeInput); // O&#39;Reilly &amp; Associates
 */
export function escapeHTML(text: string) {
  return text.replace(/[&<>'"]/g, entity => {
    switch (entity) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case "'":
        return '&#39;';
      case '"':
        return '&quot;';
      default:
        return entity;
    }
  });
}
