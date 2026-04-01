import type { SearchParams } from "../types";

export const createSearchParamsUrl = (params: SearchParams): string => {
  const urlParams = new URLSearchParams();

  urlParams.append("page", params.page.toString());
  urlParams.append("limit", params.limit.toString());

  if (params.search) {
    urlParams.append("search", params.search);
  }

  if (params.params && params.params.length > 0) {
    params.params.forEach((p) => {
      if (Array.isArray(p.value)) {
        p.value.forEach((v) => {
          urlParams.append(p.key, v.toString());
        });
      } else if (p.value) {
        urlParams.append(p.key, p.value.toString());
      }
    });
  }

  return urlParams.toString();
};
