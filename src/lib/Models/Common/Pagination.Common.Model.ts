interface Pagination<T> {
  count: number;
  page: number;
  limit: number;
  data: T[];
  offset: number;
}

export function Pagination<T>(
  count: number,
  limit: number,
  data: T[]
): Pagination<T> {
  const page = Math.ceil(count / limit);
  const pagination: Pagination<T> = {
    count,
    page: page ?? 0,
    limit: limit ?? 8,
    data,
    offset: Math.max(0, count - (page - 1) * limit),
  };

  return pagination;
}
