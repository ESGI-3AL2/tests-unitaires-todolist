import Item from './Item' ; 

export default class ItemList {
   
    private listArray : Item[] ; 

    constructor () {
        this.listArray  = new Array<Item>(10) ; 
    }

    addItem (Item) : boolean | Error {

        if (this.checkListSize() < 10) {
            return new Error ("max size : can't add new item due to max size") ; 
        }

        if (!this.checkAddInterval()) {
            return new Error("can't add item 30 min are required between tow adds") ; 
        }

        if (this.checkEightItem()) {
            
        }

        return true ; 
    }

    checkListSize () : number {

        return this.listArray.length ;  
    }

    checkEightItem () : boolean {

        return true ; 
    }

    checkAddInterval () : boolean {

        return false;
    }


}