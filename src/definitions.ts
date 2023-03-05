export interface BluetoothPrinterPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
