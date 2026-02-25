export class PubSub {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(type, callback) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type).add(callback);
  }

  unsubscribe(type, callback) {
    if (this.subscribers.has(type)) {
      const callbacks = this.subscribers.get(type);
      callbacks.delete(callback);
    }
  }
  publish(type, data) {
    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach((cb) => cb(data));
    }
  }
}
export const pubSub = new PubSub();
