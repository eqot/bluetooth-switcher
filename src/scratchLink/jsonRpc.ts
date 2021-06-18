export class JsonRpc {
  private webSocket?: WebSocket;

  private handlers: any = {};

  static async getAvailability(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const webSocket = new WebSocket(url);

      webSocket.onopen = () => {
        webSocket.close();
        resolve(true);
      };

      webSocket.onerror = () => {
        resolve(false);
      };
    });
  }

  async open(url: string): Promise<void> {
    return new Promise((resolve) => {
      this.webSocket = new WebSocket(url);
      this.webSocket.onmessage = this.handleMessage.bind(this);
      this.webSocket.onopen = () => resolve();
    });
  }

  setMessageHandler(event: string, handler: (message: any) => void): void {
    this.handlers[event] = handler;
  }

  removeMessageHandler(event: string): void {
    if (this.handlers[event]) {
      delete this.handlers[event];
    }
  }

  send(method: string, params: any): void {
    if (!this.webSocket) {
      return;
    }

    const message = {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    };

    // console.log('send', message);

    this.webSocket.send(JSON.stringify(message));
  }

  handleMessage(event: { data: string }): void {
    const message = JSON.parse(event.data);
    // console.log(message);

    if (message.jsonrpc !== '2.0') {
      return;
    }

    const handler = this.handlers[message.method];
    if (handler) {
      handler(message);
    }

    /*
    switch (message.method) {
      case 'didDiscoverPeripheral': {
        break;
      }

      case 'characteristicDidChange': {
        const listener = this.listeners.get('characteristicDidChange');
        if (!listener) {
          return;
        }

        const data = base64js.toByteArray(message.params.message);
        listener(data);

        break;
      }
    }
      */
  }
}
