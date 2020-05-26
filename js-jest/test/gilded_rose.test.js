const {Shop, Item} = require("../src/gilded_rose");
const {shopItems} = require("./texttest_fixture.js");

describe("Single item in shop", function() {
  it("should contain an item named foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});
