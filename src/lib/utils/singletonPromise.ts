export function singletonPromise<T>(fn: () => Promise<T>) {
  let promise: Promise<T> | null = null;

  return () => {
    if (!promise) {
      promise = fn().finally(() => {
        promise = null;
      });
    }

    return promise;
  };
}
