const {Shop, Item} = require("../src/gilded_rose");
const {shopItems} = require("./texttest_fixture.js");

//boundary cases

describe("Zero items in shop", function(){
  it("should have zero items in shop", function() {
    const gildedRose = new Shop([])
    expect(gildedRose.items.length).toBe(0)
  })
})

describe("Single item in shop", function() {
  it("should contain an item named foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    expect(gildedRose.items[0].name).toBe("foo");
  });
});

describe("Many items in a shop", function() {
  it("should contain the number of items in the shopItems array", function() {
    const gildedRose = new Shop(shopItems)
    expect (gildedRose.items.length).toBe(shopItems.length)
  })
})

//mutations
//item quality decreases
describe("item quality decreases after 1 day", function() {
  it("should decrease after quality updated", function() {
    const gildedRose = new Shop([new Item("foo", 2, 2)])
    const items = gildedRose.updateQuality()
    expect (items[0].quality).toBe(1)
  })
})

describe("item quality decreases after 2 days", function() {
  it("should decrease after quality updated", function() {
    const gildedRose = new Shop([new Item("foo", 2, 2)])
    gildedRose.updateQuality()
    const items = gildedRose.updateQuality()
    expect (items[0].quality).toBe(0)
  })
})

describe("item quality should not decrease below 0", function() {
  it("should stop at quality = 0 ", function() {
    const gildedRose = new Shop([new Item("foo", 2, 0)])
    const items = gildedRose.updateQuality()
    expect (items[0].quality).toBe(0)
  })
})

describe("item quality should decrease twice as fast after sellIn date", function() {
  it("should decrease by two", function() {
    const gildedRose = new Shop([new Item("foo", 0, 2)])
    const items = gildedRose.updateQuality()
    expect (items[0].quality).toBe(0)
  })
})

//fails - not sure if this is a bug, or if I've misunderstood the way the component works. To look at further.
describe("item quality should not be above 50", function() {
  it("should be 50", function() {
    const gildedRose = new Shop([new Item("Foo", 2, 55)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(50)
  })
})

//item sellIn decreases
describe("item sellin decreases after 1 day", function() {
  it("should decrease after quality updated", function() {
    const gildedRose = new Shop([new Item("foo", 2, 2)])
    const items = gildedRose.updateQuality()
    expect (items[0].sellIn).toBe(1)
  })
})

describe("item sellin can be less than 0", function() {
  it("should decrease after quality updated", function() {
    const gildedRose = new Shop([new Item("foo", 0, 2)])
    const items = gildedRose.updateQuality()
    expect (items[0].sellIn).toBe(-1)
  })
})

//special cases
describe("aged brie increases in quality over time", function() {
  it("should increase in quality", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(1)
  })
})

describe("aged brie increases in quality over time after sellIn date", function() {
  it("should increase in quality", function() {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 0)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(2)
  })
})

describe("item quality should not be above 50 - aged brie", function() {
  it("should be 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(50)
  })
})

describe("sulfuras should always have a quality of 80", function() {
  it("should be 80", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(80)
  })
})

//the specs say that "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
//as we are not able to change the item component, we must give this item some sellIn date
//to denote that we do not need to sell it, do we want to just never update it? Or update and never look at it?

// describe("sulfuras sellIn date should not change", function() {
//   it("should be 1", function() {
//     const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)])
//     const items = gildedRose.updateQuality()
//     expect(items[0].sellIn).toBe(1)
//   })
// })

describe("concert ticket quality should increase by 2 when there are <10 days before sellIn", function() {
  it("should be 1", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 44)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(46)
  })
})

describe("concert ticket quality should increase by 3 when there are <5 days before sellIn", function() {
  it("should be 1", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 44)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(47)
  })
})

describe("concert ticket quality should be 0 after sellIn date", function() {
  it("should be 1", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toBe(0)
  })
})
