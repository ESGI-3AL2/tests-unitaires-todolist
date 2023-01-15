import User  from "./src/User"
import ItemList from "./src/ItemsList"
import Item from "./src/Item"
import moment from "moment";

const user : User = new User("mmaze@gmail.com" , "mazene" , "zerg" , moment() , "coucou") ; 



const item : Item = new Item("hello" , "ccc" , new Date()) ; 

for (let i = 0 ; i < 10 ; i++)
 {
    user.todos.addItem(item) ; 
 }


 
 user.todos.addItem(item) ; 
