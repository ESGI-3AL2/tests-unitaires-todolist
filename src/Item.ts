export default class Item {

  private name : string ; 
  private creationDate : Date ; 

  constructor(name : string , date : Date) {
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

  setItemDate (date : Date) : void {
    this.creationDate = date ; 
  }

  checkItemName () : Error | boolean {

    if (this.name.length > 1000 ) {
      return Error ("max lenght exceeded") ; 
    }

    return true ;
  }

  

}