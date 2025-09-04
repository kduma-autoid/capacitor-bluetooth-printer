# @kduma-autoid/capacitor-bluetooth-printer

Allows printing on SPP BT printers

Check full documentation here: [opensource.duma.sh/libraries/capacitor/bluetooth-printer](https://opensource.duma.sh/libraries/capacitor/bluetooth-printer)

## Install

```bash
npm install @kduma-autoid/capacitor-bluetooth-printer
npx cap sync
```

## API

<docgen-index>

* [`list()`](#list)
* [`connect(...)`](#connect)
* [`print(...)`](#print)
* [`disconnect()`](#disconnect)
* [`connectAndPrint(...)`](#connectandprint)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### list()

```typescript
list() => Promise<{ devices: BluetoothDevice[]; }>
```

**Returns:** <code>Promise&lt;{ devices: BluetoothDevice[]; }&gt;</code>

--------------------


### connect(...)

```typescript
connect(options: { address: string; }) => Promise<void>
```

| Param         | Type                              |
| ------------- | --------------------------------- |
| **`options`** | <code>{ address: string; }</code> |

--------------------


### print(...)

```typescript
print(options: { data: string; }) => Promise<void>
```

| Param         | Type                           |
| ------------- | ------------------------------ |
| **`options`** | <code>{ data: string; }</code> |

--------------------


### disconnect()

```typescript
disconnect() => Promise<void>
```

--------------------


### connectAndPrint(...)

```typescript
connectAndPrint(options: { address: string; data: string; }) => Promise<void>
```

| Param         | Type                                            |
| ------------- | ----------------------------------------------- |
| **`options`** | <code>{ address: string; data: string; }</code> |

--------------------


### Type Aliases


#### BluetoothDevice

<code>{ name: string, address: string, type: <a href="#bluetoothdevicetype">BluetoothDeviceType</a> }</code>


### Enums


#### BluetoothDeviceType

| Members       | Value                  |
| ------------- | ---------------------- |
| **`Unknown`** | <code>"unknown"</code> |
| **`Classic`** | <code>"classic"</code> |
| **`Le`**      | <code>"le"</code>      |
| **`Dual`**    | <code>"dual"</code>    |

</docgen-api>
