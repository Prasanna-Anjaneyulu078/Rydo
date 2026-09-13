/**
 * Rydo Real-Time Socket Service Preparation
 * Allows plugging in socket.io-client or real-time WebSockets seamlessly.
 * Provides pub-sub event listeners for driver coordinates, ride status, and AI match beacons.
 */

class SocketService {
  constructor() {
    this.listeners = new Map();
    this.isConnected = true;
    this.socket = null; // Will store io() instance when backend is attached
  }

  connect(url = '/api/socket') {
    // Ready for `this.socket = io(url)`
    console.log(`[Rydo Socket] Initialized real-time listener simulation on ${url}`);
    this.isConnected = true;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.listeners.clear();
    this.isConnected = false;
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
    // Local subscriber notification
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
  }

  // Simulated telemetry ticker for driver movement
  simulateDriverCoordinates(onUpdate) {
    const coords = [
      { x: 280, y: 220, label: 'Pickup: 452 Market' },
      { x: 330, y: 260, label: 'KA-01-MJ-4102 • 4m away' },
      { x: 440, y: 310, label: 'En Route Market St' },
      { x: 520, y: 375, label: 'Mid Route • 18 min' },
      { x: 610, y: 460, label: 'Passing 4th St corridor' },
      { x: 720, y: 620, label: 'Arrived at Mission Bay Hub' }
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % coords.length;
      onUpdate(coords[idx]);
    }, 3500);

    return () => clearInterval(interval);
  }
}

export const socketService = new SocketService();
