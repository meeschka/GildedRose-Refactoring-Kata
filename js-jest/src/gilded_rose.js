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

class UpdateAgedBrie {
  update(item) {
    const quality = item.quality >= 50 ? 50 : item.quality + 1
    return(new Item(item.name, item.sellIn--, quality))
  }
}
class UpdateSulfuras {
  update(item) {
    return(new Item(item.name, item.sellIn, 80))
  }
}

class UpdatePasses {
  update(item) {
    let quality = item.quality
    let sellIn = item.sellIn-1
    if (item.sellIn < 1) {
      quality = 0
    } else if (item.sellIn < 6) {
      quality = quality < 47 ? quality + 3 : 50
    } else if (item.sellIn < 11) {
      quality = quality < 48 ? quality + 2 : 50
    } else {
      quality = quality >= 50 ? 50 : quality + 1
    }
    return (new Item(item.name, sellIn, quality))
  }
}

class UpdateItem {
  update(item) {
    let modifier = item.sellIn > 0 ? 1 : 2
    if (item.name === 'Conjured'){
      modifier *= 2
    } 
    const sellIn = item.sellIn - 1
    let quality = item.quality
    if (quality > 50) {
      quality = 50
    } else if (quality < 1) {
      quality = 0
    } else quality -= modifier

    return(new Item(item.name, sellIn, quality))
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.UpdateManager = new UpdateManager();
    this.UpdateAgedBrie = new UpdateAgedBrie();
    this.UpdateSulfuras = new UpdateSulfuras();
    this.UpdatePasses = new UpdatePasses();
    this.UpdateItem = new UpdateItem();
  }

  updateQuality() {
    let newItems = this.items.map((item) => {
      if (typeof item.quality !== 'number' || typeof item.sellIn !== 'number') {
        throw new Error('expected numeric arguments')
      }

      if (item.name === 'Aged Brie') {
        this.UpdateManager.strategy=this.UpdateAgedBrie
      } else if (/[Ss]ulfuras/.test(item.name)) {
        this.UpdateManager.strategy=this.UpdateSulfuras
      } else if (/[Bb]ackstage [Pp]asses/.test(item.name)) {
        this.UpdateManager.strategy=this.UpdatePasses
      } else {
        this.UpdateManager.strategy=this.UpdateItem
      }
      return(this.UpdateManager.doUpdate(item))
    })
    this.items = newItems
    return this.items
  }
}

module.exports = {
  Item,
  Shop,
  UpdateAgedBrie,
  UpdateSulfuras,
  UpdatePasses,
  UpdateItem
}
