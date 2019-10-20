declare module 'react-resize-aware' {
  import * as React from 'react';

  type ResizeListener = React.ReactNode;

  interface Sizes {
    readonly height: number;
    readonly width: number;
  }

  function useResizeAware(): [ResizeListener, Sizes];
  export = useResizeAware;
}
