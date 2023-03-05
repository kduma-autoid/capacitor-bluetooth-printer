import { registerPlugin } from '@capacitor/core';

import type { BluetoothPrinterPlugin } from './definitions';

const BluetoothPrinter = registerPlugin<BluetoothPrinterPlugin>(
  'BluetoothPrinter',
  {
    web: () => import('./web').then(m => new m.BluetoothPrinterWeb()),
  },
);

export * from './definitions';
export { BluetoothPrinter };
