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
    this.items.forEach(item => {

      const modifier = item.sellIn > 0 ? 1 : 2

      if (item.name === 'Aged Brie') {
        item.quality = item.quality >= 50 ? 50 : item.quality+modifier
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        item.quality = 80
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 1) {
          item.quality = 0
        } else if (item.sellIn < 6) {
          item.quality = item.quality < 47 ? item.quality + 3 : 50
        } else if (item.sellIn < 11) {
          item.quality = item.quality < 48 ? item.quality + 2 : 50
        } else {
          item.quality = item.quality >= 50 ? 50 : item.quality+modifier
        }
      } else {
        if (item.quality > 50) {
          item.quality = 50
        } else if (item.quality < 1) {
          item.quality = 0
        } else item.quality -= modifier
      }
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
