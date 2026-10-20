import { Request, Response, NextFunction } from "express";

// API contract: every JSON object answer carries ok (true below HTTP 400) and, on failure, error.
// Routes that already set ok are left alone; the old "success" flag is replaced by ok.
export function contratOk(_req: Request, res: Response, next: NextFunction): void {
  const json = res.json.bind(res);
  res.json = ((body?: unknown) => {
    if (body && typeof body === "object" && !Array.isArray(body) && !("ok" in body)) {
      const { success: _success, ...reste } = body as Record<string, unknown>;
      return json({ ok: res.statusCode < 400, ...reste });
    }
    return json(body);
  }) as Response["json"];
  next();
}
