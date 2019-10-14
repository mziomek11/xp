export function changeCursor(cursor?: string): void {
  if (!cursor) document.body.className = "";
  else document.body.className = cursor;
}
