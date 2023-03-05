export type BluetoothDevice = { name: string, address: string, type: BluetoothDeviceType };

export interface BluetoothPrinterPlugin {
  list(): Promise<{ devices: BluetoothDevice[] }>;
  connect(options: { address: string }): Promise<void>;
  print(options: { data: string }): Promise<void>;
  disconnect(): Promise<void>;

  connectAndPrint(options: { address: string, data: string }): Promise<void>;
}

export enum BluetoothDeviceType {
  Unknown = "unknown",
  Classic = "classic",
  Le = "le",
  Dual = "dual",
}