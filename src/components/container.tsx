import * as React from 'react';

interface ContainerProps {
  readonly children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <svg>{children}</svg>;
}
