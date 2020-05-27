const {Shop, Item} = require("../src/gilded_rose");
const {shopItems} = require("./texttest_fixture.js");
//consider breaking into interface and methods
//what if the item is bad? will it do multiple items? grep?
//break it into describes and it
//use fixture more
//desc ribe a shop with one item, with multiple items, thats one way to break it down


describe("Shop component", function(){
  it("should have zero items in shop", function() {
    const gildedRose = new Shop([])
    expect(gildedRose.items.length).toBe(0)
  })

  it("should contain an item named foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    expect(gildedRose.items[0].name).toBe("foo");
  });

  it("should contain the number of items in the shopItems array", function() {
    const gildedRose = new Shop(shopItems)
    expect (gildedRose.items.length).toBe(shopItems.length)
  })

  //assume that items added with quality > 50 are revised down to 50
  it("should not contain an item with quality > 50", function() {
    const gildedRose = new Shop([new Item("Foo", 2, 55)])
    expect(items[0].quality).toBe(50)
  })
})

describe("updateQuality method", function() {
  describe("changes to quality", function() {
    const gildedRose = new Shop([new Item("foo", 2, 4), new Item("bar", 5, 10)])

    it("should decrease after quality updated", function() {
      const items = gildedRose.updateQuality()
      expect (items[0].quality).toBe(3)
    })
  
    it("should decrease after quality updated a second time", function() {
      const items = gildedRose.updateQuality()
      expect (items[0].quality).toBe(2)
    })

    if("should also decrease the quality of the second item", function() {
      expect (item[1].quality.toBe(8))
    })
  
    it("should decrease by two after sellIn date", function() {
      const items = gildedRose.updateQuality()
      expect (items[0].quality).toBe(0)
    })
  
    it("should stop at quality = 0 ", function() {
      const items = gildedRose.updateQuality()
      expect (items[0].quality).toBe(0)
    })
  })

  describe("changes to sellIn date", function() {
    const gildedRose = new Shop([new Item("foo", 1, 2)])

    it("should decrease after quality updated", function() {
      const items = gildedRose.updateQuality()
      expect (items[0].sellIn).toBe(0)
    })

    it("should be capable of negative numbers", function() {
      const items = gildedRose.updateQuality()
      expect (items[0].sellIn).toBe(-1)
    })
  })

  describe("special cases", function() {
    describe("aged brie", function() {

      const gildedRose = new Shop([new Item("Aged Brie", 1, 48)])

      it("should increase in quality", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(49)
      })

      //as written, aged brie increases in quality at twice the base rate after sellIn date
      //it is unclear if this is the intended behaviour
      //based on the rules 'Once the sell by date has passed, Quality degrades twice as fast' and
      //'"Aged Brie" actually increases in Quality the older it gets', as well as the assumed linear nature of cheese aging,
      //I've elected for the rate of cheese quality increase to remain constant, even after the sellIn date
      it("should increase in quality after sellIn date", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(50)
      })

      it("should not increase above 50", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(50)
      })
    })

    describe("sulfuras", function() {
      const gildedRose = new Shop([new Item("Sulfuras", 1, 80)])
      //specs state that '"Sulfuras", being a legendary item, never has to be sold or decreases in Quality'
      //Assume this means any Sulfuras, not just the Hand of Ragnaros
      it("should be 80", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(80)
      })

      //the specs say that "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
      //as we are not able to change the item component, we must give this item some sellIn date
      //to denote that we do not need to sell it, do we want to just never update it? Or update and never look at it?
      
      it("should not change sellIn date", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(1)
      })
    })

    describe("concert tickets", function(){

      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 30)])
      it("should increase by 1 when there are >10 days left", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(31)
      })
      
      it("should increase by 2 when there are 6-10 days left", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(33)
      })

      it("should increase by 3 when there are 0-5 days before sellIn", function() {
        for (let i =0; i<4; i++){
          gildedRose.updateQuality()
        }
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(33+4*2+3)
      })

      it("should not increase above 50", function() {
        for (let i =0; i<3; i++){
          gildedRose.updateQuality()
        }
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(50)
      })

      it("should be 0 after sellIn date", function() {
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(0)
      })
    })
  })
})