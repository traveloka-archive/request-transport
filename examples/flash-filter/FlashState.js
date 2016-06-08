export default class FlashState {
  constructor() {
    this.state = {};
  }

  set(key, value) {
    this.state[key] = value;
  }

  get(key) {
    return this.state[key];
  }

  toString() {
    return JSON.stringify(this.state);
  }
}
