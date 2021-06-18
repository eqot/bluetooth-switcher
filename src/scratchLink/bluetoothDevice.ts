import { BluetoothRemoteGATTServer } from './bluetoothRemoteGATTServer';
import { JsonRpc } from './jsonRpc';

export class BluetoothDevice {
  id: string;
  name?: string;
  rssi?: number;

  gatt!: BluetoothRemoteGATTServer;

  private rpc?: JsonRpc;

  constructor(id: string, name?: string, rssi?: number) {
    this.id = id;
    this.name = name;
    this.rssi = rssi;

    this.gatt = new BluetoothRemoteGATTServer(this, this.id);
  }

  setRpc(rpc: JsonRpc): void {
    this.rpc = rpc;
  }

  send(method: string, params: any): void {
    if (this.rpc) {
      this.rpc.send(method, params);
    }
  }
}
