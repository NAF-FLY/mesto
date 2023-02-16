export class Section {
  constructor({ renderer }, containerСlassList) {
    this._renderer = renderer;
    this._container = document.querySelector(containerСlassList);
  }
  renderItems(item) {
    item.forEach((item) => this._renderer(item));
  }

  addCard(item) {
    this._container.prepend(item);
  }
}
