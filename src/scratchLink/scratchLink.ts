import { JsonRpc } from './jsonRpc';
import { BluetoothDevice } from './bluetoothDevice';

export class ScratchLink {
  private static WEBSOCKET_URL = 'wss://device-manager.scratch.mit.edu:20110/scratch/ble';

  private rpc?: JsonRpc;

  private isScanning = false;

  private foundDevices: { [id: string]: BluetoothDevice } = {};

  static async getAvailability(): Promise<boolean> {
    return JsonRpc.getAvailability(ScratchLink.WEBSOCKET_URL);
  }

  async requestDevice(options?: { filters?: { serviceUuid?: string }[] }) {
    if (!this.rpc) {
      this.rpc = new JsonRpc();
      await this.rpc.open(ScratchLink.WEBSOCKET_URL);
    }

    if (this.isScanning) {
      console.log('Already scanning.');
      return this.foundDevices;
    }
    this.isScanning = true;

    this.rpc.setMessageHandler('didDiscoverPeripheral', (message: any) => {
      const device = new BluetoothDevice(
        message.params.peripheralId,
        message.params.name || undefined,
        message.params.rssi || undefined
      );

      this.foundDevices[device.id] = device;
    });

    this.rpc.send('discover', options);

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        // Sort devices in RSSI order
        // const devices = Object.values(this.foundDevices).sort((a: any, b: any) => b.rssi - a.rssi)

        completed();
      }, 1000);

      const timer = setInterval(() => {
        if (Object.keys(this.foundDevices).length > 0) {
          completed();
        }
      }, 100);

      const completed = () => {
        this.isScanning = false;

        clearTimeout(timeout);
        clearInterval(timer);

        const device = Object.values(this.foundDevices)[0];

        if (this.rpc) {
          this.rpc.removeMessageHandler('didDiscoverPeripheral');

          if (device) {
            device.setRpc(this.rpc);
          }
        }

        // console.log(device);
        resolve(device);
      };
    });
  }
}
