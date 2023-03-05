import { WebPlugin } from '@capacitor/core';

import type { BluetoothPrinterPlugin } from './definitions';

export class BluetoothPrinterWeb
  extends WebPlugin
  implements BluetoothPrinterPlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
