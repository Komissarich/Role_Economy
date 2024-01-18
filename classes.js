console.log("111111111")

const resources = new Map([
    ["materials", 100],
    ["wheat", 100],
    ["meat", 175],
    ["leather", 75],
    ["ore", 100],
    ["goods", 300],
    ["rare_materials", 300],
    ["precious_materials", 300],
    ["delicacy", 300],
    ["livestock", 300],
    ["light_equipment", 300],
    ["instrument", 300],
    ["jewelry", 500],
    ["church_goods", 500],
    ["horses", 500],
    ["ammunition", 500],
    ["heavy_equipment", 500],
    ]) 
    

class Country{

    constructor(name, player_name, color, cities, player_storage, character_list, armies, culture, prestige, religions) {
        this.name = name
        this.player_name = player_name
        this.color = color
        this.cities = cities
        this.player_storage = player_storage
        this.character_list = character_list
        this.armies = armies
        this.culture = culture
        this.prestige = prestige
        this.religions = religions
    }

}

class Market {
    constructor(inventory) {
        this.inventory = inventory
    }

    
    
    buy_request(good) {
        
    }
}

class City {
    constructor(name, coords, households, buildings) {
        this.name = name
        this.coords = coords
        this.households = households
        this.buildings = buildings
        this.market = new Market()
    }

    
}


class Household {

    constructor(storage, money, city, lvl, consumption_list, wishlist) {
        this.storage = storage
        this.money = money
        this.city = city
        this.set_name()
        this.hunger = 0
        this.lvl = lvl
        this.initiative = 1
        this.consumption_list = consumption_list
        this.wishlist = wishlist
    }

    pre_purchase() {}

    production() {}

    consumption() {
        console.log(`${this.name} кушает пшеницу`)
        this.storage.set("wheat", this.storage.get("wheat") - (1 * lvl))
    }

    sell(a) {
        
    }

    upgrade() {
        console.log(`${this.name} улучшается`)
    }

    set_name() {}

    buy(resource, offer_price) {
        transaction = this.city.market.buy_requesasd
        transaction.result = true
        transaction.offer_price = 200
        return transaction
    }

    rebellion() {
        console.log(`В ${this.name} восстание!`)
    }
    
    death() {
        console.log(`${this.name} вымерло из-за голода`)
        this.destruction()
    }

    destruction() {
        console.log(`${this.name} разрушено`)
    }
}

class Building {

    constructor(type) {
        this.type = type
    }

    production() {}

    destruction() {}

}

class Farming extends Household {

    set_name() {
        let x = 1
        for (let i = 0; i < this.city.households.length; i ++ ) { 
            if (this.city.households[i] instanceof Farming == true) {
               x += 1 
            }
        }
        this.name = "Farming_" + this.city.name + "_" + x
    }

    fail_buy(good) {
        console.log(`Фермерское хозяйство ${this.name}  не смогло купить ${good}, милорд`)
        if (good == "wheat") {
            this.hunger += 1
            if (this.hunger == 2) {
                this.rebellion()
            }
            if (this.hunger == 3) {
                this.death()
            }
        }
    }

    pre_purchase() {
        for(let i = 0; i < this.consumption_list.length; i ++) {
            good = this.consumption_list[i]
            trans = this.buy(good)
            if (trans.)
        }
    }

    production() {
        console.log(`Фермерское хозяйство ${this.name} произвело 3 пшеницы, милорд`)
        this.storage.set("wheat", this.storage.get("wheat") + 3)
    }

    consumption() {
       super()
    }

    sell() {
        for (let i = this.storage.get("wheat"); i > -1; i = i - 1) {
            
        }
    }


}


class Livestock extends Household {

    set_name() {
        let x = 1
        for (let i = 0; i < this.city.households.length; i ++ ) { 
            if (this.city.households[i] instanceof Livestock == true) {
               x += 1 
            }
        }
        this.name = "Livestock_" + this.city.name + "_" + x
    }

    pre_purchase() {
        if (this.storage.get("wheat") == 0) {
            console.log(`Скотоводческое хозяйство ${this.name} пытается купить пшеницу для выживания, милорд`)
            let trans = this.buy("wheat")
            if (trans.result == true && trans.offer_price < this.money) {
                console.log(`Скотоводческое хозяйство ${this.name} успешно купило пшеницу для выживания, милорд`)
                this.storage.set("wheat", this.storage.get("wheat") + 1)
                this.money -= trans.offer_price
            }
            else {
                console.log(`Скотоводческое хозяйство ${this.name} не смогло купить пшеницу для выживания, милорд`)
            }
        }

        if (this.storage.get("wheat") == 1) {
            console.log(`Скотоводческое хозяйство ${this.name} пытается купить пшеницу для скота, милорд`)
            let trans = this.buy("wheat")
            if (trans.result == true && trans.cost < this.money) {
                console.log(`Скотоводческое хозяйство ${this.name} успешно купило пшеницу для выживания, милорд`)
                this.storage.set("wheat", this.storage.get("wheat") + 1)
                this.money -= trans.cost
            }
            else {
                console.log(`Скотоводческое хозяйство ${this.name} не смогло купить пшеницу для скота, милорд`)
            }
        }
    }

    production() {
        if (this.storage.get("wheat") < 1) {
            console.log(`Не хватает еды для скота в ${this.name}, милорд`)
        }
        else {
            console.log(`Скотоводческое хозяйство ${this.name} произвело 2 скота, милорд`)
            this.storage.set("wheat", this.storage.get("wheat") - 1)
            this.storage.set("livestock", this.storage.get("livestock") + 2)
        }
        
        
    }

    consumption() {
        super()
    }

    sell() {

    }

}
