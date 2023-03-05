import { WebPlugin } from '@capacitor/core';

import type { BluetoothDevice, BluetoothPrinterPlugin } from './definitions';

export class BluetoothPrinterWeb
  extends WebPlugin
  implements BluetoothPrinterPlugin
{
  connect(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  connectAndPrint(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  disconnect(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  list(): Promise<{ devices: BluetoothDevice[] }> {
    throw this.unimplemented('Not implemented on web.');
  }

  print(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

}
