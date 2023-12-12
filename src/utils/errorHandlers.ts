export function errorMsgHandler(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  } else if ((e as any)?.message) {
    return `${(e as any).message}`;
  } else {
    console.error(e);
    return `Unknown error: ${e}`;
  }
}
