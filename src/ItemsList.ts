import Item from './Item';
import EmailSenderService from './EmailSenderService';
import moment from 'moment';

export default class ItemList {
	private listArray: Item[];
	public emailService: EmailSenderService;

	constructor() {
		this.listArray = new Array<Item>();
		this.emailService = new EmailSenderService();
	}

	addItem(item: Item): boolean | Error {
		if (this.checkListSize() >= 10) {
			return new RangeError("max size : can't add new item due to max size");
		}
		if (!this.checkAddInterval(item)) {
			throw new Error("can't add item 30 min are required between tow adds");
		}

       for (let i = 0 ; i < this.listArray.length ; i++) 
       {
        if (this.listArray[i].getItemName() === item.getItemName()) return false;
       }
		this.listArray = [...this.listArray, item];

		if (this.checkListSize() === 8) {
			this.emailService.notify();
		}

		return true
	}

	checkListSize(): number {
		return this.listArray.length;
	}

	checkAddInterval(item : Item): boolean { 
        const lastElemet = this.listArray[this.listArray.length - 1 ] ;   
        if (lastElemet !== undefined) {
           console.log(lastElemet.getDate()) ;
           
            if (moment(item.getDate()).diff(moment(lastElemet.getDate()) , "millisecond") <= 1800000) {
                return false;
            }
        }
        return true ;
	}
}
