export async function fetchFromApi<T>(url: string, init: RequestInit = {}) {
  const res = await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    }),
    ...init,
  });
  if (res.status === 200) {
    const data = await res.json();
    return data as T;
  } else {
    const data = await res.text();
    throw new Error(`${res.status} - ${data || res.statusText}`);
  }
}
