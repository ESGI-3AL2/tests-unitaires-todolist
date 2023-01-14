import Item from './Item' ; 
import EmailSenderService from './EmailSenderService';
import moment from 'moment';

export default class ItemList {
   
    private listArray : Item[] ; 
    private emailService : EmailSenderService ; 
    constructor () {
        this.listArray  = new Array<Item>(10) ; 
    }

    // adding a new item to the items array 
    addItem (item : Item) : boolean | Error {
        // checking the max size 
        if (this.checkListSize() === 10) {
            return new Error ("max size : can't add new item due to max size") ; 
        }
        // checking the time interval 
        if (!this.checkAddInterval()) {
            return new Error("can't add item 30 min are required between tow adds") ; 
        }
        // sending an email in case of 8th element in the list 
        if (this.checkEightItem()) {
            this.emailService.eightItemNotificationEmail() ; 
        }

        // adding the item to the list 
        this.listArray.push(item) ; 
        console.log ("Item added succusfuly") ; 
        return true ; 
    }

    // list size 
    checkListSize () : number {
        return this.listArray.length ;  
    }

    // eight item 
    checkEightItem () : boolean {
        return this.checkListSize() === 8 ; 
    }

    // time interval 
    checkAddInterval () : boolean {
        const currentSize : number = this.checkListSize() ; 
        const lastItem : Item = this.listArray[currentSize] ; 
        return moment().diff(lastItem.getDate()) < 30 ; 
    }


}