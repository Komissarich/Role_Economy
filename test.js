let Resource = require('./classes.js');
let Market = require('./classes.js');
let City = require('./classes.js');
let Household = require('./classes.js');

var wheat = new Resource("wheat", "123", 100, "food", 1.1 )
var livestock = new Resource("livestock", "321", 300, "shmot", 1.1)
resours = new Map([
    ["wheat", wheat],
    ["livestock", livestock]
])
var beb = new Market(new Map([
    ["wheat", 1],
    ["livestock", 1]
]), new Map([
    ["wheat", 100],
    ["livestock", 300]
]))
var Bebr = new City("Bebr", "132", [], [], beb, 2000, new Map([
    ["wheat", 0],
    ["livestock", 0]
]) )
var a = new Household(new Map([
    ["wheat", 5],
    ["livestock", 2]
]), new Map([
    ["wheat", 0],
    ["livestock", 0]
]), 0, Bebr, 1, [],[],[],[])
var b = new Household(new Map([
    ["wheat", 6],
    ["livestock", 1]
]), new Map([
    ["wheat", 0],
    ["livestock", 0]
]), 0, Bebr, 1, [],[],[],[])
Bebr.households = Bebr.households || [];
Bebr.households.push(a)
Bebr.households.push(b)
Bebr.city_purchase();
console.log(beb.storage("wheat"))
console.log(beb.storage("livestock"))
beb.make_prices()
console.log(beb.price_map("wheat"))
console.log(beb.price_map("livestock"))
