// NOXEL Forge — safeFetch: fetch() for URLs given by members (their site, submitted pages, exchange
// pages, badge check). Same rules as NOXEL SEO (backend/src/shared/safeFetch.ts there): http(s) only, no
// credentials in the URL, usual ports only, private / local / cloud-metadata addresses refused at every
// redirect AND at every DNS resolution (the socket connects to the validated address: no DNS rebinding).
// Returns a standard Response, so it is a drop-in for fetch(). Our own API calls (Stripe, Anthropic,
// GitHub, Microsoft, LinkedIn, RDAP, NOXEL SEO) keep using fetch().
import http from "http";
import https from "https";
import zlib from "zlib";
import dns from "dns";
import net from "net";
import type { LookupFunction } from "net";

export function isPrivateAddress(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) ||
      (a === 192 && b === 0) || (a === 198 && (b === 18 || b === 19));
  }
  if (net.isIPv6(ip)) {
    const s = ip.toLowerCase();
    if (s === "::" || s === "::1") return true;
    if (s.startsWith("fc") || s.startsWith("fd") || s.startsWith("fe8") || s.startsWith("fe9") || s.startsWith("fea") || s.startsWith("feb") || s.startsWith("ff")) return true;
    const mapped = s.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateAddress(mapped[1]);
    return false;
  }
  return true;
}

export const safeLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err) return (callback as any)(err);
    const list = addresses as dns.LookupAddress[];
    if (!list.length || list.some((a) => isPrivateAddress(a.address))) {
      return (callback as any)(Object.assign(new Error("blocked_address"), { code: "EBLOCKED" }));
    }
    if ((options as any)?.all) return (callback as any)(null, list);
    (callback as any)(null, list[0].address, list[0].family);
  });
};

export function urlGuard(u: URL): string | null {
  if (u.protocol !== "https:" && u.protocol !== "http:") return "protocol_not_allowed";
  if (u.username || u.password) return "credentials_in_url";
  // IP literals never go through the DNS lookup hook: check them here
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || (net.isIP(host) && isPrivateAddress(host))) return "blocked_address";
  if (u.port && !["80", "443", "8080", "8443"].includes(u.port)) return "port_not_allowed";
  return null;
}


export interface SafeFetchInit {
  method?: "GET" | "HEAD";
  headers?: Record<string, string>;
  redirect?: "follow" | "manual" | "error";
  signal?: AbortSignal;
  /** Used when no signal is given. Default 15 s. */
  timeoutMs?: number;
  /** Bodies are cut at this size (default 8 MB). */
  maxBytes?: number;
  /** Tests only: replaces the DNS lookup (the address checks of urlGuard still apply). */
  lookupForTests?: typeof safeLookup;
}

const MAX_REDIRECTS = 10;
const DEFAULT_UA = "Mozilla/5.0 (compatible; NOXELForgeBot/1.0; +https://noxelforge.com)";
const NULL_BODY = new Set([101, 103, 204, 205, 304]);

/** Error thrown like fetch() does (TypeError "fetch failed"), with the reason in cause.code. */
function fail(code: string, message = code): TypeError {
  return Object.assign(new TypeError("fetch failed"), { cause: Object.assign(new Error(message), { code }) });
}

export function isBlockedFetchError(err: unknown): boolean {
  const code = (err as any)?.cause?.code;
  return code === "EBLOCKED" || code === "blocked_address" || code === "port_not_allowed" || code === "credentials_in_url" || code === "protocol_not_allowed";
}

function decode(body: Buffer, encoding: string | undefined): Buffer {
  try {
    switch ((encoding || "").toLowerCase().trim()) {
      case "gzip": case "x-gzip": return zlib.gunzipSync(body);
      case "deflate": return zlib.inflateSync(body);
      case "br": return zlib.brotliDecompressSync(body);
      default: return body;
    }
  } catch {
    return body; // a truncated or mislabelled body: hand back what we have
  }
}

function once(url: URL, init: SafeFetchInit, signal: AbortSignal): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: Buffer | null }> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(signal.reason ?? fail("ABORT_ERR", "aborted"));
    const lib = url.protocol === "https:" ? https : http;
    const method = init.method ?? "GET";
    const maxBytes = init.maxBytes ?? 8_000_000;
    const req = lib.request(url, {
      method,
      lookup: init.lookupForTests ?? safeLookup,
      headers: { "accept": "*/*", "user-agent": DEFAULT_UA, "accept-encoding": "gzip, deflate, br", ...lowerKeys(init.headers ?? {}) },
      agent: false,
    }, (res) => {
      const status = res.statusCode ?? 0;
      if (method === "HEAD" || NULL_BODY.has(status)) {
        res.resume();
        return resolve({ status, headers: res.headers, body: null });
      }
      const chunks: Buffer[] = [];
      let size = 0;
      let cut = false;
      res.on("data", (c: Buffer) => {
        if (cut) return;
        size += c.length;
        if (size > maxBytes) { cut = true; chunks.push(c.subarray(0, c.length - (size - maxBytes))); res.destroy(); return; }
        chunks.push(c);
      });
      const done = () => resolve({ status, headers: res.headers, body: decode(Buffer.concat(chunks), res.headers["content-encoding"] as string | undefined) });
      res.on("end", done);
      res.on("close", () => { if (cut) done(); });
      res.on("error", (e) => (cut ? done() : reject(fail((e as any)?.code || "ERR_NETWORK", e.message))));
    });
    const onAbort = () => req.destroy(Object.assign(new Error("aborted"), { code: "ABORT_ERR" }));
    signal.addEventListener("abort", onAbort, { once: true });
    req.on("close", () => signal.removeEventListener("abort", onAbort));
    req.on("error", (e: any) => {
      if (signal.aborted) return reject(signal.reason ?? fail("ABORT_ERR", "aborted"));
      reject(fail(e?.code === "EBLOCKED" ? "EBLOCKED" : e?.code || "ERR_NETWORK", e?.message));
    });
    req.end();
  });
}

function lowerKeys(h: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(h)) out[k.toLowerCase()] = v;
  return out;
}

function toHeaders(h: http.IncomingHttpHeaders): Headers {
  const out = new Headers();
  for (const [k, v] of Object.entries(h)) {
    // content-encoding / content-length are kept as received, like fetch(): scanners read them
    // (compression checks) even though the body handed back is already decoded
    if (v === undefined) continue;
    for (const one of Array.isArray(v) ? v : [v]) {
      try { out.append(k, one); } catch { /* invalid header value: skip */ }
    }
  }
  return out;
}

export async function safeFetch(input: string | URL, init: SafeFetchInit = {}): Promise<Response> {
  let current: URL;
  try { current = new URL(String(input)); } catch { throw fail("invalid_url"); }
  const signal = init.signal ?? AbortSignal.timeout(init.timeoutMs ?? 15_000);
  const mode = init.redirect ?? "follow";

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const blocked = urlGuard(current);
    if (blocked) throw fail(blocked);

    const r = await once(current, init, signal);
    const location = typeof r.headers.location === "string" ? r.headers.location : null;
    const isRedirect = r.status >= 300 && r.status < 400 && r.status !== 304 && !!location;

    if (isRedirect && mode === "follow") {
      try { current = new URL(location!, current); } catch { throw fail("bad_redirect"); }
      continue;
    }
    if (isRedirect && mode === "error") throw fail("redirect_not_allowed");

    const status = r.status >= 200 && r.status <= 599 ? r.status : 502;
    const response = new Response(NULL_BODY.has(status) || r.body === null ? null : new Uint8Array(r.body), {
      status,
      headers: toHeaders(r.headers),
    });
    Object.defineProperty(response, "url", { value: current.href });
    Object.defineProperty(response, "redirected", { value: hop > 0 });
    return response;
  }
  throw fail("too_many_redirects");
}

/** Pre-check for tools that open the URL themselves (local Lighthouse/Chrome): refuses private targets. */
export async function assertPublicUrl(raw: string): Promise<void> {
  let u: URL;
  try { u = new URL(raw); } catch { throw fail("invalid_url"); }
  const blocked = urlGuard(u);
  if (blocked) throw fail(blocked);
  await new Promise<void>((resolve, reject) => {
    safeLookup(u.hostname.replace(/^\[|\]$/g, ""), {}, (err: any) => (err ? reject(fail(err.code === "EBLOCKED" ? "EBLOCKED" : err.code || "ENOTFOUND")) : resolve()));
  });
}

/** safeFetch typed as fetch, for the collectors that take a fetchImpl (tests still inject their own). */
export const fetchSur: typeof fetch = ((input: unknown, init?: any) =>
  safeFetch(input instanceof URL ? input : String(input), {
    method: init?.method, headers: init?.headers, redirect: init?.redirect, signal: init?.signal ?? undefined,
  })) as unknown as typeof fetch;
