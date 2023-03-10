export class Section {
  constructor({ renderer }, container–°lassList) {
    this._renderer = renderer;
    this._container = document.querySelector(container–°lassList);
  }
  renderItems(item) {
    item.forEach((item) => this._renderer(item));
  }

  addCard(item) {
    this._container.prepend(item);
  }
}
