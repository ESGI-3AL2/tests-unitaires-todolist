import Item from './Item';
import EmailSenderService from './EmailSenderService';
import moment from 'moment';

export default class ItemList {
	private listArray: Item[];
	private emailService: EmailSenderService;

	constructor() {
		this.listArray = new Array<Item>();
		this.emailService = new EmailSenderService();
	}

	addItem(item: Item): boolean | Error {
		if (this.checkListSize() >= 10) {
			throw new Error("max size : can't add new item due to max size");
		}
		if (!this.checkAddInterval()) {
			throw new Error("can't add item 30 min are required between tow adds");
		}

        this.listArray.map((element : Item) => {
            if (element.getItemName() === item.getItemName()) {
                throw new Error("todo name must be unique") ;
            }
        }) ; 

		this.listArray = [...this.listArray, item];

		if (this.checkListSize() === 8) {
			this.emailService.notify();
		}

		return true
	}

	checkListSize(): number {
		return this.listArray.length;
	}

	checkAddInterval(): boolean { 
        const lastElemet = this.listArray[this.listArray.length - 1 ] ;   
        if (lastElemet !== undefined) {
            if (moment().diff(moment(lastElemet.getDate()) , "minutes") < 30) {
                return false;
            }
        }
        return true ;
	}
}
