console.log("111111111")

const resources = new Map([
["wheat", 100],
["wood", 200],
["iron", 500],
["ammunition", 2000],
["stones", 200],
])


class Country{

    constructor(name, player_name, color, cities, player_storage, character_list, armies, culture, prestige, religions, storage, money) {
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
        this.storage = storage
        this.money = money
    }

}

class Market {
    constructor() {

    }

    sell_request() {
        
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

    constructor(storage, money, city, lvl) {
        this.storage = storage
        this.money = money
        this.city = city
        this.set_name()
        this.hunger = 0
        this.lvl = lvl
        this.initiative = 1
    }

    pre_purchase() {}

    production() {}

    consumption() {
        console.log(`${this.name} кушает пшеницу`)
        this.storage.set("wheat", this.storage.get("wheat") - (1 * lvl))
    }

    sell() {
        
    }

    upgrade() {
        console.log(`${this.name} улучшается`)
    }

    set_name() {}

    buy(resource, offer_price) {
        const transaction = new Object()
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

    pre_purchase() {
        if (this.storage.get("wheat") == 0) {
            console.log(`Фермерское хозяйство ${this.name} пытается купить пшеницу, милорд`)
            let trans = this.buy("wheat")
            if (trans.result == true && trans.offer_price < this.money) {
                console.log(`Фермерское хозяйство ${this.name} успешно купило пшеницу, милорд`)
                this.storage.set("wheat", this.storage.get("wheat") + 1)
                this.money -= trans.offer_price
            }
            else {
                console.log(`Фермерское хозяйство ${this.name} не смогло купить пшеницу, милорд`)
                this.hunger += 1
                if (this.hunger == 2) {
                    this.rebellion()
                }
                if (this.hunger == 3) {
                    this.death()
                }
            }
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
class Militarycamp extends Household{
    constructor(lvl, money, storage, City){
        this.storage = storage
        this.money = money
        this.lvl = lvl
        this.City = City
    }
    
    set_name() {
        let x = 1
        for (let i = 0; i < this.city.households.length; i ++ ) { 
            if (this.city.households[i] instanceof Militiascamp == true) {
               x += 1 
            }
        }
        this.name = "Militarycamp" + this.city.name + "_" + x
    }
    pre_purchase() {
        if (this.storage.get("wheat") == 0) {
            console.log(`военный домик ${this.name} пытается купить пшеницу, милорд`)
            let trans = this.buy("wheat")
            if (trans.result == true && trans.offer_price < this.money) {
                console.log(`военный домик ${this.name} успешно купил пшеницу, милорд`)
                this.storage.set("wheat", this.storage.get("wheat") + 1)
                this.money -= trans.offer_price
            }
            else {
                console.log(`Военный домик ${this.name} не смог купить пшеницу, милорд`)
                this.hunger += 1
                if (this.hunger == 2) {
                    this.rebellion()
                }
                if (this.hunger == 3) {
                    this.death()
                }
            }
        }
    }
    
    production(){
        switch (this.lvl) {
            case 0:
                if (this.City.storage.get("wheat") < 1) {
                    this.pre_purchase
                }
                else {
                    console.log(`Лагерь ополчения ${this.name} произвел 4 ополченца, милорд`)
                    this.City.storage.set("wheat", this.City.storage.get("wheat") - 1)
                    this.City.storage.set("recruits1", this.City.storage.get("recruits1") + 4)
                }
                break;
            case 1:
                if(this.City.money < this.lvl * 0.5){
                    console.log(`Не хватает денег для воина в ${this.name}, милорд`)
                }
                else{
                    this.money += this.lvl * 0.5
                    this.City.money -= this.lvl * 0.5
                }
                if (this.storage.get("wheat") < 1) {
                    this.pre_purchase
                }
                else {
                    console.log(`Лагерь воинов ${this.name} произвел 4 воина, милорд`)
                    this.storage.set("wheat", this.City.storage.get("wheat") - 1)
                    this.City.storage.set("recruits1", this.City.storage.get("recruits1") + 4)
                }
                 break;
            case 2:
                if(this.City.money < this.lvl * 0.5){
                    console.log(`Не хватает денег для солдат в ${this.name}, милорд`)
                }
                else{
                    this.money += this.lvl * 0.5
                    this.City.money -= this.lvl * 0.5
                }
                if (this.storage.get("wheat") < 1) {
                    this.pre_purchase
                }
                else {
                    console.log(`Лагерь солдат ${this.name} произвел 4 солдата, милорд`)
                    this.storage.set("wheat", this.City.storage.get("wheat") - 1)
                    this.City.storage.set("recruits1", this.City.storage.get("recruits1") + 4)
                }
                break;                
            case 3:
                if(this.City.money < this.lvl * 0.5){
                    console.log(`Не хватает денег для шевалье в ${this.name}, милорд`)
                }
                else{
                    this.money += this.lvl * 0.5
                    this.City.money -= this.lvl * 0.5
                }
                if (this.storage.get("wheat") < 1) {
                    this.pre_purchase
                }
                else {
                    console.log(`замок швалей ${this.name} произвел 4 швали, милорд`)
                    this.storage.set("wheat", this.City.storage.get("wheat") - 1)
                    this.City.storage.set("recruits4", this.City.storage.get("recruits4") + 4)
                }
                break;
            default:
                console.log(`неверно указан уровень постройки ${this.name}`)
                break;
        }
    }

}

7