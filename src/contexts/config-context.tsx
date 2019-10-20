import * as React from 'react';

import { GraphConfig } from '../types/types';
import { ConfigManager } from '../types/utilities/config-manager';

const defaults: GraphConfig = {
  axes: {
    tickLength: 10,
    tickThickness: 1,
    axisThickness: 1,
  },
};

export const ConfigContext = React.createContext<ConfigManager>(new ConfigManager(defaults));

interface ConfigProviderProps {
  readonly config: Partial<GraphConfig>;
  readonly children: React.ReactNode;
}

export const ConfigProvider = ({ config, children }: ConfigProviderProps) => {
  const combined = { ...defaults, ...config };
  const manager = React.useMemo(() => new ConfigManager(combined), [config]);

  return <ConfigContext.Provider value={manager}>{children}</ConfigContext.Provider>;
};
