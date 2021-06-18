import base64js from 'base64-js';

import { BluetoothRemoteGATTService } from './bluetoothRemoteGATTService';

export class BluetoothRemoteGATTCharacteristic {
  private service: BluetoothRemoteGATTService;
  private uuid: string;

  private listeners: { [event: string]: (event: Event) => void } = {};

  constructor(service: BluetoothRemoteGATTService, uuid: string) {
    this.service = service;
    this.uuid = uuid;
  }

  async readValue(): Promise<DataView> {
    const buffer = new ArrayBuffer(2);
    const dataView = new DataView(buffer);
    return dataView;
  }

  async writeValue(value: Uint8Array): Promise<undefined> {
    console.log('writeValue', this.uuid, value);

    this.service.device.send('write', {
      serviceId: '10b20100-5b3b-4571-9508-cf3efcd7bbae',
      characteristicId: this.uuid,
      message: base64js.fromByteArray(value),
      encoding: 'base64',
      // withoutResponse,
    });

    return;
  }

  addEventListener(event: string, listener: (event: Event) => void): void {
    console.log('addEventListener', this.uuid);

    this.listeners[event] = listener;
  }

  async startNotifications(): Promise<BluetoothRemoteGATTCharacteristic> {
    console.log('startNotifications', this.uuid);

    return this;
  }
}
