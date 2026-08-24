export default { async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" || url.pathname === "" ? "/index.html" : url.pathname;
    const direct = await env.ASSETS.fetch(new Request(new URL(pathname, request.url), request));
    if (direct.status !== 404) return direct;
    return env.ASSETS.fetch(new Request(new URL("/dist" + pathname, request.url), request));
  } };
