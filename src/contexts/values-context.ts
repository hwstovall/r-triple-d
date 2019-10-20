import { GraphData } from '../types/types';
import { createContextRequired } from '../types/utilities/react';

interface ValuesContextValue {
  readonly labels: ReadonlyArray<string>;
  readonly data: GraphData;
}

export const ValuesContext = createContextRequired<ValuesContextValue>();
