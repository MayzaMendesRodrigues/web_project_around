export class Section {
  constructor(items, renderer, itemsContainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._itemsContainer = document.querySelector(itemsContainerSelector);
  }

  _addItem(itemElement) {
    this._itemsContainer.prepend(itemElement);
  }

  removeItem(item) {
    let index = this._items.indexOf(item);
    if (index !== -1) {
      let containerIndex = this._items.length - index - 1;

      this._itemsContainer.children[containerIndex].remove();
      this._items.splice(index, 1);
    }
  }

  addItem(item) {
    this._items.push(item);
    this._addItem(this._renderer(item));
  }

  renderItems() {
    this._itemsContainer.innerHTML = "";
    this._items.forEach((item) => {
      this._addItem(this._renderer(item));
    });
  }
}
