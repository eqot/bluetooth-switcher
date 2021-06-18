import { BluetoothDevice } from './bluetoothDevice';
import { BluetoothRemoteGATTService } from './bluetoothRemoteGATTService';

export class BluetoothRemoteGATTServer {
  private device: BluetoothDevice;

  constructor(device: BluetoothDevice, peripheralId: string) {
    this.device = device;
  }

  async connect(): Promise<BluetoothRemoteGATTServer> {
    // console.log('connect');

    this.device.send('connect', { peripheralId: this.device.id });

    return this;
  }

  async getPrimaryService(uuid: string): Promise<any> {
    // console.log('getPrimaryService', uuid);

    return new BluetoothRemoteGATTService(this.device);
  }
}
