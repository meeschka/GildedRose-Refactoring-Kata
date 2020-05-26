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

//item sellIn decreases
describe("item sellin decreases after 1 day", function() {
  it("should decrease after quality updated", function() {
    const gildedRose = new Shop([new Item("foo", 2, 2)])
    const items = gildedRose.updateQuality()
    expect (items[0].sellIn).toBe(1)
  })
})