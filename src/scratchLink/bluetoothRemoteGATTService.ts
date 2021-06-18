import { BluetoothDevice } from './bluetoothDevice';
import { BluetoothRemoteGATTCharacteristic } from './bluetoothRemoteGATTCharacteristic';

export class BluetoothRemoteGATTService {
  device: BluetoothDevice;

  constructor(device: BluetoothDevice) {
    this.device = device;
  }

  async getCharacteristic(uuid: string): Promise<BluetoothRemoteGATTCharacteristic> {
    // console.log('getCharacteristic', uuid);

    return new BluetoothRemoteGATTCharacteristic(this, uuid);
  }
}
