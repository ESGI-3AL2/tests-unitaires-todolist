import moment from 'moment';

import { expect, test, jest, describe } from '@jest/globals';
import Item from '../src/Item';
import ItemList from '../src/ItemsList';

describe('items list', () => {
	test(`add 1 item should make the itemlist's size to 1`, () => {
		let itemlist: ItemList = new ItemList();

		expect(itemlist.addItem(new Item('coucou', 'other something', moment().add(25, 'hours')))).toBeTruthy();
		expect(itemlist.checkListSize()).toEqual(1);
	});

	test(`add 3 items in the items list size should equal to 3`, () => {
		let itemlist: ItemList = new ItemList();

		itemlist.addItem(new Item('some todo', 'something', moment()));
		itemlist.addItem(new Item('coucou', 'other something', moment().add(1, 'hour')));
		itemlist.addItem(new Item('hello world', 'other something', moment().add(2, 'hour')));

		expect(itemlist.checkListSize()).toEqual(3);
	});

	test(`checkAddInterval method should return false when adding a 2nd item before 30 min 1 ms`, () => {
		let itemlist: ItemList = new ItemList();

		itemlist.addItem(new Item('some todo', 'something', moment()));
		let checkingInterval: boolean = itemlist.checkAddInterval(
			new Item('coucou', 'other something', moment().add(25, 'minute')),
		);

		expect(checkingInterval).toEqual(false);
	});

	test(`checkAddInterval method should return false when adding a 2nd item after 30 min`, () => {
		let itemlist: ItemList = new ItemList();

		itemlist.addItem(new Item('some todo', 'something', moment()));
		let checkingInterval: boolean = itemlist.checkAddInterval(
			new Item('coucou', 'other something', moment().add(31, 'minute')),
		);

		expect(checkingInterval).toEqual(true);
	});

	test('add test with time interval check', () => {
		let itemlist: ItemList = new ItemList();
		itemlist.addItem(new Item('coucou', 'other something', moment()));
		const checkTimeAdd: any = itemlist.addItem(new Item('toto', 'other something', moment().add(12, 'minutes')));

		expect(checkTimeAdd).toStrictEqual(RangeError("can't add item 30 min are required between tow adds"));
	});

	test(`when adding more than 10 items, the itemlist'size should be 10 & it should throws an error`, () => {
		let itemlist: ItemList = new ItemList();

		for (let i = 1; i < 11; i++) {
			itemlist.addItem(new Item('coucou' + i, 'other something', moment().add(i, 'hours')));
		}

		expect(itemlist.addItem(new Item('toto', 'tata', moment().add(25, 'hours')))).toStrictEqual(
			RangeError("max size : can't add new item due to max size"),
		);
		expect(itemlist.checkListSize()).toEqual(10);
	});

	test(`when adding an item whose name already exist in the itemlist, addItem method should return false`, () => {
		let itemlist: ItemList = new ItemList();

		itemlist.addItem(new Item('coucou', 'other something', moment().add(1, 'hours')));

		expect(itemlist.addItem(new Item('coucou', 'other something', moment().add(25, 'hours')))).toBeFalsy();
	});

	test(`when adding an 8th item, it should send an email notification`, () => {
		let itemlist: ItemList = new ItemList();
		const notifyMock = jest.fn().mockReturnValue(true);
		itemlist['emailService'] = { notify: notifyMock };

		for (let i = 1; i <= 7; i++) {
			itemlist.addItem(new Item('coucou' + i, 'other something', moment().add(i, 'hours')));
		}

		expect(itemlist.addItem(new Item('coucou', 'other something', moment().add(25, 'hours')))).toBeTruthy();
		expect(notifyMock).toBeCalledTimes(1);
		expect(notifyMock).toReturnWith(false);
	});
});
