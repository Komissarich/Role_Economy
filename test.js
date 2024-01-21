function abc(b) {
    production_map = new Map([
        ["iron", 2],
        ["equipment", 1]
    ])

    let storage = new Map([
        ["wheat",15],
        ["ore", 9]
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

    for (good of production_map.keys()) {
        for (i = 0; i < production_map.get(good); i++) {
           console.log("NOW MAKING", good)
            is_productionable = true
            let backup = new Map(storage)
            console.log("BACKUP", backup)
            for (j = 0; j < spending_map.length; j++) {
                if (spending_map[j].get(good) != undefined) {
                    for (resource_to_spend of spending_map[j].get(good).keys()) {
                        console.log(resource_to_spend)
                        if (storage.get(resource_to_spend) >= spending_map[j].get(good).get(resource_to_spend)) {
                            console.log(storage)
                            storage.set(resource_to_spend, storage.get(resource_to_spend) - spending_map[j].get(good).get(resource_to_spend))
                            console.log(storage)
                        }
                        else {
                            is_productionable = false
                        }
                    }
                }
            }
            if (is_productionable == true) {
                console.log("SUCCESFULLY", good)
            }
            else {
                console.log("FAILED", good)
                console.log(storage)
                console.log("bb", backup)
                storage = backup
                console.log(storage)
            }
        }
    }
        
}


abc(10)