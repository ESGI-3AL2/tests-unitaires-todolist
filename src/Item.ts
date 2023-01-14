export default class Item {

  private name : string ;
  private creationDate : Date ;

  constructor(name : string , private content: string, date : Date) {
			this.checkContent(content);

      this.name = name ;
      this.creationDate = date ;
  }


  getDate () : Date {
    return this.creationDate ;
  }

  getItemName () : string {
    return this.name ;
  }

  setItemName (itemName : string) : void {
    this.name =  itemName ;
  }

	getContent(): string {
		return this.content;
	}

	setContent(value: string) {
		this.content = value;
	}

  setItemDate (date : Date) : void {
    this.creationDate = date ;
  }

  checkContent(content: string) : void | Error {
    if (content.length > 1000) {
      throw Error ("max lenght exceeded");
    }
  }

}