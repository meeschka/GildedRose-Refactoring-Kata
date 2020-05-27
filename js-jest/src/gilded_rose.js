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
    this._strategy.update(item)
  }  
}
//currently mutating items, need to add immutability at some point
class updateAgedBrie {
  update(item) {
    item.quality = item.quality >= 50 ? 50 : item.quality + 1
    item.sellIn--
  }
}

class updateSulfuras {
  update(item) {
    item.quality = 80
  }
}

class updatePasses {
  update(item) {
    if (item.sellIn < 1) {
      item.quality = 0
    } else if (item.sellIn < 6) {
      item.quality = item.quality < 47 ? item.quality + 3 : 50
    } else if (item.sellIn < 11) {
      item.quality = item.quality < 48 ? item.quality + 2 : 50
    } else {
      item.quality = item.quality >= 50 ? 50 : item.quality + 1
    }
    item.sellIn--
  }
}

class updateItem {
  update(item) {
    let modifier = item.sellIn > 0 ? 1 : 2
      if (item.name === 'Conjured'){
        modifier *= 2
      } 

      if (item.quality > 50) {
        item.quality = 50
      } else if (item.quality < 1) {
        item.quality = 0
      } else item.quality -= modifier

      item.sellIn--
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

    this.items.forEach(item => {
      if (item.name === 'Aged Brie') {
        this.updateManager.strategy=this.updateAgedBrie
      } else if (/[Ss]ulfuras/.test(item.name)) {
        this.updateManager.strategy=this.updateSulfuras
      } else if (/[Bb]ackstage [Pp]asses/.test(item.name)) {
        this.updateManager.strategy=this.updatePasses
      } else {
        this.updateManager.strategy=this.updateItem
      }
      this.updateManager.doUpdate(item)
      return item
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
