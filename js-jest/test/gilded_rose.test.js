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

