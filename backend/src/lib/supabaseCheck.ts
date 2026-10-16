// Supabase never throws: a failed query returns { data: null, error }. Every call goes through
// must() so a failure is logged and stops the request (JSON 500 via the error handler in index.ts)
// instead of being read as "no row".

export class SupabaseError extends Error {
  context: string;
  constructor(context: string, message: string) {
    super(`[supabase] ${context}: ${message}`);
    this.name = 'SupabaseError';
    this.context = context;
  }
}

export function must<T>(result: { data: T; error: { message: string } | null }, context: string): T {
  if (result.error) throw new SupabaseError(context, result.error.message);
  return result.data;
}
