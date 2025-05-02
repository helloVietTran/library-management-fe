const createQueryFn = (apiFn: any) => {
  return ({ queryKey }: any) => {
    const [, ...params] = queryKey;
    return apiFn(...params);
  };
};

export default createQueryFn;
