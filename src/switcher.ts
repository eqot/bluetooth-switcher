import { ScratchLink } from './scratchLink';

export class BluetoothSwitcher {
  private static originalBluetooth?: any;

  static switch(): void {
    if (navigator.bluetooth.constructor.name === 'Bluetooth') {
      this.originalBluetooth = navigator.bluetooth;

      navigator.__defineGetter__('bluetooth', () => new BluetoothSwitcher());
      // console.log('Switched!!!');
    }
  }

  async getAvailability(): Promise<boolean> {
    if (await ScratchLink.getAvailability()) {
      return true;
    }

    return BluetoothSwitcher.originalBluetooth.getAvailability();
  }

  async requestDevice(options: any): Promise<any> {
    if (await ScratchLink.getAvailability()) {
      const scratchLink = new ScratchLink();
      return scratchLink.requestDevice(options);
    }

    return BluetoothSwitcher.originalBluetooth.requestDevice(options);
  }
}

BluetoothSwitcher.switch();
