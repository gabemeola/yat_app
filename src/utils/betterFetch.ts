/**
 * A Fetch Request that errors on non 2xx status codes
 */
export default function betterFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  return fetch(input, init)
    .then((response) => {
      if (response.ok) return response;

      throw response;
    })
    .catch((err: Response) => {
      throw err;
    });
}
