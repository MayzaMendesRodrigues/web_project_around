export class Section {
  constructor({items, renderer}, cardsContainerSelector){
    this._items = items
    this.renderer = renderer
    this._cardsContainer = document.querySelector(cardsContainerSelector)
  }

  addItem(cardElement) {
    this._cardsContainer.prepend(cardElement)
   }

  renderItems(){
  this._items.forEach(item => {
    this.renderer(item)
   });
 }
}