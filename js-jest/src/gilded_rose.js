class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    const updateAgedBrie = (item) => {
      item.quality = item.quality >= 50 ? 50 : item.quality + 1
    }

    const updateSulfuras = (item) => {
      item.quality = 80
      item.sellIn++
    }

    const updatePasses = (item) => {
      if (item.sellIn < 1) {
        item.quality = 0
      } else if (item.sellIn < 6) {
        item.quality = item.quality < 47 ? item.quality + 3 : 50
      } else if (item.sellIn < 11) {
        item.quality = item.quality < 48 ? item.quality + 2 : 50
      } else {
        item.quality = item.quality >= 50 ? 50 : item.quality + 1
      }
    }

    const updateBasicItem = (item) => {
      let modifier = item.sellIn > 0 ? 1 : 2
      if (item.name === 'Conjured'){
        modifier *= 2
      } 

      if (item.quality > 50) {
        item.quality = 50
      } else if (item.quality < 1) {
        item.quality = 0
      } else item.quality -= modifier
    }

    this.items.forEach(item => {
      if (item.name === 'Aged Brie') {
        updateAgedBrie(item)
      } else if (/[Ss]ulfuras/.test(item.name)) {
        updateSulfuras(item)
      } else if (/[Bb]ackstage [Pp]asses/.test(item.name)) {
        updatePasses(item)
      } else updateBasicItem(item)
      item.sellIn--
      return item
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
