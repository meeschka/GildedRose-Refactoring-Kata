class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
class UpdateManager {
  constructor(){
    this._strategy = null;
  }

  set strategy(strategy) {
    this._strategy = strategy
  }

  doUpdate(item){
    return(this._strategy.update(item))
  }  
}
//currently mutating items, need to add immutability at some point
class updateAgedBrie {
  update(item) {
    const quality = item.quality >= 50 ? 50 : item.quality + 1
    return(new Item(item.name, item.sellIn--, quality))
  }
}
class updateSulfuras {
  update(item) {
    return(new Item(item.name, item.sellIn, 80))
  }
}

class updatePasses {
  update(item) {
    let quality = item.quality
    if (item.sellIn < 1) {
      quality = 0
    } else if (item.sellIn < 6) {
      quality = quality < 47 ? quality + 3 : 50
    } else if (item.sellIn < 11) {
      quality = quality < 48 ? quality + 2 : 50
    } else {
      quality = quality >= 50 ? 50 : quality + 1
    }
    return (new Item(item.name, item.sellIn--, quality))
  }
}

class updateItem {
  update(item) {
    let modifier = item.sellIn > 0 ? 1 : 2
    if (item.name === 'Conjured'){
      modifier *= 2
    } 
    let quality = item.quality
    if (quality > 50) {
      quality = 50
    } else if (quality < 1) {
      quality = 0
    } else quality -= modifier

    return(new Item(item.name, item.sellIn--, quality))
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.updateManager = new UpdateManager();
    this.updateAgedBrie = new updateAgedBrie();
    this.updateSulfuras = new updateSulfuras();
    this.updatePasses = new updatePasses();
    this.updateItem = new updateItem();
  }

  updateQuality() {
    let newItems = []
    this.items.forEach((item) => {
      if (item.name === 'Aged Brie') {
        this.updateManager.strategy=this.updateAgedBrie
      } else if (/[Ss]ulfuras/.test(item.name)) {
        this.updateManager.strategy=this.updateSulfuras
      } else if (/[Bb]ackstage [Pp]asses/.test(item.name)) {
        this.updateManager.strategy=this.updatePasses
      } else {
        this.updateManager.strategy=this.updateItem
      }
      newItems.push(this.updateManager.doUpdate(item))
    })
    this.items = newItems
    return this.items
  }
}

module.exports = {
  Item,
  Shop
}
