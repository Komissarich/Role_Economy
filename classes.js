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
    transaction = {result:false, message: ""}
    constructor(inventory, price_map,transaction) {
        this.inventory = inventory
        this.price_map = price_map
    }

    make_prices() {
       for (name of this.storage.keys()) {
        count_of_goods += this.storage(name)
       }
        for (name of resources.keys()) {
            default_price = resources[name]
            count = this.inventory.get(name)
            
            
        
        }
    }
    
    buy_request(good, money) {
        if(this.inventory.get(good) > 0 && money >= this.price_map.get(good)) {
            transaction = true
            this.inventory.set(good, this.inventory.get(good) - 1)  
        }
        else if (money < this.price_map.get(good)){
            transaction = false
        }
        else if (this.inventory.get(good) <= 0){
            transaction = false
            this.inventory.set(good, this.inventory.get(good) - 1)  
        }
}
}

class City {
    constructor(name, coords, households, buildings, storage) {
        this.name = name
        this.coords = coords
        this.households = households
        this.buildings = buildings
        this.market = new Market()
        this.storage = storage
    }

city_purchase(){
    for(j = 0; j<this.households.length;j++){
        for(good of this.households[j].sell_storage.keys()){
            while(this.households[j].sell_storage.get(good) > 0){
                transaction = this.buy(good)
                if (transaction.result == true && transaction.offer_price <= this.money) {
                    this.households[j].sell_storage.set(good, this.households[j].sell_storage.get(good) - 1)
                    this.storage.set(good, this.storage.get(good) + 1)
                    this.money -= transaction.offer_price
                    this.households[j].money += transaction.offer_price
                    }
                    
                }
            }
        }
    }
    
}


class Household {
    constructor(sell_storage, storage, money, city, lvl, consumption_map, wish_map, spending_map, production_map) {
        this.sell_storage = sell_storage
        this.storage = storage
        this.money = money
        this.city = city
        this.set_name()
        this.hunger = 0
        this.lvl = lvl
        this.initiative = 1
        this.consumption_map = consumption_map
        this.wish_map = wish_map
        this.spending_map = spending_map
        this.production_map = production_map
    }
    set_name() {}
    consumption_purchase() {
        for(good of this.consumption_map.keys()) {
            for (j = 0; j < this.consumption_map.get(good); j++) {
                this.buy(good)
                if (this.city.market.transaction == true && transaction.offer_price <= this.money) {
                    this.sell_storage.set(good, this.sell_storage.get(good) + 1)
                    this.money -= transaction.offer_price
                }
                else this.fail_buy(good)
            }
        }
    }
    fail_buy(good) {
        console.log(`${this.name} не смогло купить ${good}, милорд`)
        
    }
    
    //Example of spending_map
    // const spending_map = [
    //    new Map([["iron", 
    //         new Map([["wheat", 2],
    //                  ["ore", 3]])
    //          ]]),
    //    new Map([["equipment",
    //           new Map([["wheat", 2],
    //                  ["ore", 2]])
    //          ]])    
    //   ]
    //
    
    consumption() {
        for (good of this.consumption_map.keys()) {
            if (this.storage.get(good) >= this.consumption_map.get(good)) {
                this.storage.set(good, this.storage.get(good) - this.consumption_map.get(good))
            }
            else {
                if (good == "wheat") {
                    this.hunger += 1
                    if (this.hunger == 2) this.rebellion()
                    if (this.hunger == 3) this.death()
                }
            }
        }
    }
    production() {
        for (good of this.production_map.keys()) {
            for (i = 0; i < this.production_map.get(good); i++) {
               //console.log("NOW MAKING", good)
                is_productionable = true
                let backup = new Map(storage)
               // console.log("BACKUP", backup)
                for (j = 0; j < this.spending_map.length; j++) {
                    if (spending_map[j].get(good) != undefined) {
                        for (resource_to_spend of this.spending_map[j].get(good).keys()) {
                      //      console.log(resource_to_spend)
                            if (storage.get(resource_to_spend) >= this.spending_map[j].get(good).get(resource_to_spend)) {
                                storage.set(resource_to_spend, this.storage.get(resource_to_spend) - this.spending_map[j].get(good).get(resource_to_spend))
                           //     console.log(storage)
                            }
                            else {
                                is_productionable = false
                            }
                        }
                    }
                }
                if (is_productionable == true) {
                  //  console.log("SUCCESFULLY", good)
                  
                }
                else {
                   // console.log("FAILED", good)
                    storage = backup
                  //  console.log(storage)
                }
            }
        }
    }
    
    upgrade() {
        console.log(`${this.name} улучшается`)
    }
    buy(resource) {
        let transaction = this.city.market.buy_request(resource, this.money)
        transaction.offer_price = 100
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
   
    consumption_purchase() {
        
    }
    production() {
        switch(this.lvl) {
        case 0:
            console.log(`Фермерская община ${this.name} произвела 3 пшеницы, милорд`)
            this.storage.set("wheat", this.storage.get("wheat") + 3)
            break
        case 1:
            console.log(`Кулачество ${this.name} произвело 4 пшеницы, милорд`)
            this.storage.set("wheat", this.storage.get("wheat") + 4)
            break
        case 2:
            console.log(`Деревня ${this.name} произвела 5 пшеницы и 1 скот, милорд`)
            this.storage.set("wheat", this.storage.get("wheat") + 5)
            this.storage.set("livestock", this.storage.get("livestock") + 1)
            break
        }
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
