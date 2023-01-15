import moment, { Moment } from 'moment';
import User from '../src/User';

import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import Item from '../src/Item';
import ItemList from '../src/ItemsList';

describe('item', () => {
	let item: Item;

	beforeEach(() => {
		item = new Item('name', ' ', moment());
	});

	test(`getItemName should return the item's name`, () => {
		const getItemSpy = jest.spyOn(item, 'getItemName');

		const name = item.getItemName();

		expect(getItemSpy).toReturnWith(name);
	});
	test(`setItemName should equal the new name`, () => {
		const newName = 'new name';

		item.setItemName(newName);

		expect(item.getItemName()).toEqual(newName);
	});
	test(`getContent should return the item's content`, () => {
		const getContentSpy = jest.spyOn(item, 'getContent');

		const content = item.getContent();

		expect(getContentSpy).toReturnWith(content);
	});
	test(`setContent should equal the new name`, () => {
		const newContent = 'new content';

		item.setContent(newContent);

		expect(item.getContent()).toEqual(newContent);
	});
	test(`setContent with a string larger than 1000 characters should throw an error`, () => {
		const newContent = ' '.repeat(1001);
		const setItemContent = () => {
			item.setContent(newContent);
		};

		expect(setItemContent).toThrow('max length exceeded');
	});
	test(`getDate should return the item's "moment" creation date`, () => {
		const getDateSpy = jest.spyOn(item, 'getDate');

		const date = item.getDate();

		expect(getDateSpy).toReturnWith(date);
	});
	test(`setItemDate should equal the new name`, () => {
		const newDate = moment();

		item.setItemDate(newDate);

		expect(item.getDate()).toEqual(newDate);
	});

	test('given a content whose length is less or equal to 1000 characters should not throw an error', () => {
		const checkContentSpy = jest.spyOn(Item.prototype, 'checkContent');
		const createItem = () => {
			new Item('name', ' '.repeat(1000), moment());
		};

		try {
			createItem();
		} catch (e) {
			expect(checkContentSpy).toBeCalled();
			expect(createItem).not.toThrowError();
		}
	});
	test('given a content whose length is greater than 1000 characters should throw an error', () => {
		const checkContentSpy = jest.spyOn(Item.prototype, 'checkContent');
		const createItem = () => {
			new Item('name', ' '.repeat(1001), moment());
		};

		try {
			createItem();
		} catch (e) {
			expect(checkContentSpy).toBeCalled();
			expect(createItem).toThrow('max length exceeded');
		}
	});
});
