function abc(b) {
    production_map = new Map([
        ["iron", 2],
        ["equipment", 1]
    ])

    let storage = new Map([
        ["wheat",15],
        ["ore", 9]
    ])

    let consumption_map = new Map([
        ["wheat", 5],
        ["ore", 3]



    ])

    const spending_map = [
          new Map([["iron", 
        	    new Map([["wheat", 2],
        		        ["ore", 3]])
                ]]),
          new Map([["equipment",
        	    new Map([["wheat", 5],
        			    ["ore", 6]])
                ]])
                    
        ]

         
            for (good of consumption_map.keys()) {
                if (storage.get(good) >= consumption_map.get(good)) {
                    storage.set(good, storage.get(good) - consumption_map.get(good))
                }
                else {
                    if (good == "wheat") {
                        this.hunger += 1
                        if (this.hunger == 2) this.rebellion()
                        if (this.hunger == 3) this.death()
                    }
                }
         }
         console.log(storage)
        
        
}


abc(10)