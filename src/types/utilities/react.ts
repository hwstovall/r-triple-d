import * as React from 'react';

export function createContextRequired<T>(): React.Context<T> {
  return React.createContext<T>(undefined as any);
}

export function useContextRequired<T>(context: React.Context<T>): T {
  const value = React.useContext(context);

  if (value === undefined) throw new Error('bug');

  return value;
}
