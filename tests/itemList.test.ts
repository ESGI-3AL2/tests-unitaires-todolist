import moment, { Moment } from 'moment';
import User from '../src/User';

import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import Item from '../src/Item';
import ItemList from '../src/ItemsList';
import { check } from 'prettier';



    test(`functional add case`, () => {
        let itemlist : ItemList = new ItemList() ;
        expect(itemlist.addItem(new Item("coucou" , "other something" , moment().add(25, "hours")))).toBeTruthy();
    });

    test(`testing items list size return`, () => {
      let itemlist : ItemList = new ItemList() ;

        itemlist.addItem(new Item('some todo', 'something', moment())) ; 
        itemlist.addItem(new Item('coucou', 'other something', moment().add(1, 'hour'))) ; 
        itemlist.addItem(new Item('hello world', 'other something', moment().add(2, 'hour'))) ; 

        expect(itemlist.checkListSize()).toEqual(3) ;
	});

    test(`checking interval time adding`, () => {
      let itemlist : ItemList = new ItemList() ;

        itemlist.addItem(new Item('some todo', 'something', moment())) ; 
       let checkingInterval : any = itemlist.checkAddInterval(new Item('coucou', 'other something', moment().add(25, "minute"))) ; 

        expect(checkingInterval).toEqual(false) ;
	});

    test(`checking passing interval time +30 minuts`, () => {
        let itemlist : ItemList = new ItemList() ;
  
          itemlist.addItem(new Item('some todo', 'something', moment())) ; 
         let checkingInterval : any = itemlist.checkAddInterval(new Item('coucou', 'other something', moment().add(31, "minute"))) ; 
  
          expect(checkingInterval).toEqual(true) ; 
      });

      test(`checking failed adding with max array size error`, () => {
        let itemlist : ItemList = new ItemList() ; 
        for (let i = 1 ; i < 11 ; i++ ) {
            itemlist.addItem(new Item('coucou' + i, 'other something', moment().add(i, "hours"))) ;
        }
        expect(itemlist.addItem(new Item("toto" , "tata" , moment().add(25, "hours")))).toStrictEqual(RangeError("max size : can't add new item due to max size"))
      });

      test(`checking adding with sufficient array size`, () => {
        let itemlist : ItemList = new ItemList() ;
         
        for (let i = 1 ; i < 5 ; i++ ) {
            itemlist.addItem(new Item('coucou' + i, 'other something', moment().add(i, "hours"))) ;
        }

        expect(itemlist.addItem(new Item("toto" , "tata" , moment().add(25, "hours")))).toBeTruthy() ;
      });

      test(`checking adding with an existing name in the array`, () => {
        let itemlist : ItemList = new ItemList() ;
        itemlist.addItem(new Item('coucou' , 'other something', moment().add(1, "hours"))) ;
        

        expect(itemlist.addItem(new Item("coucou" , "other something" , moment().add(25, "hours")))).toBeFalsy() ;
      });

      test(`checking adding with an existing name in the array`, () => {
        let itemlist : ItemList = new ItemList() ;
        for (let i = 1 ; i < 8 ; i++ ) {
            itemlist.addItem(new Item('coucou' + i, 'other something', moment().add(i, "hours"))) ;
        }
        itemlist.emailService.notify = jest.fn().mockReturnValue(true) ;
        expect(itemlist.addItem(new Item("coucou" , "other something" , moment().add(25, "hours")))).toBeTruthy();
      });








