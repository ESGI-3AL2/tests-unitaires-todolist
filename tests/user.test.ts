import moment, { Moment } from 'moment';
import User from '../src/User';

import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import Item from '../src/Item';
import ItemList from '../src/ItemsList';

describe('user', () => {
	const MINIMAL_AGE: number = 13;
	let minDateOfBirth: Moment;

	beforeEach(() => {
		minDateOfBirth = moment().subtract(MINIMAL_AGE, 'years');
	});

	test('todos getter should return an instance of ItemList', () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');
		const getTodosSpy = jest.spyOn(user, 'todos', 'get');

		const todos = user.todos;

		expect(getTodosSpy).toReturnWith(todos);
		expect(todos).toBeInstanceOf(ItemList);
	});

	test('given all correct information, user should be valid', () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeTruthy();
	});

	test('given an empty last name, user should be invalid', () => {
		const user = new User('', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});
	test('given an empty first name, user should be invalid', () => {
		const user = new User('toto@email.fr', '', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});
	test('given an empty email, user should be invalid', () => {
		const user = new User('', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});
	test('given a wrong date of birth, user should be invalid', () => {
		const dateOfBirth = moment().subtract(MINIMAL_AGE - 1, 'years');
		const user = new User('toto@email.fr', 'prenom', 'nom', dateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});

	test('given an bad email, user should be invalid', () => {
		const user = new User('bad email', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});

	test(`given a user's age < 13, user should be invalid`, () => {
		const twoYearsOldDateOfBirth = moment().subtract(2, 'years');
		const user = new User('toto@email.fr', 'prenom', 'nom', twoYearsOldDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});

	test(`given a user's age >= 13, user should be valid`, () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeTruthy();
	});

	test('given a less than 13 years old user adding an item, an item should not be added', () => {
		const twoYearsOldDateOfBirth = moment().subtract(2, 'years');
		const user = new User('toto@email.fr', 'prenom', 'nom', twoYearsOldDateOfBirth, '12345678aZ');
		const { todos } = user;
		const item = new Item('some todo', 'something', moment());
		const isUserValidSpy = jest.spyOn(user, 'isValid');
		const todosAddItemSpy = jest.spyOn(todos, 'addItem');

		const isTodoAdded = user.addTodo(item);

		expect(isUserValidSpy).toBeCalled();
		expect(isUserValidSpy).toReturnWith(false);
		expect(todosAddItemSpy).not.toBeCalled();
		expect(isTodoAdded).toBeFalsy();
	});
	test('given a 13 years old user adding an item, an item should be added', () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');
		const { todos } = user;
		const item = new Item('some todo', 'something', moment());
		const isUserValidSpy = jest.spyOn(user, 'isValid');
		const todosAddItemSpy = jest.spyOn(todos, 'addItem');

		const isTodoAdded = user.addTodo(item);

		expect(isUserValidSpy).toBeCalled();
		expect(isUserValidSpy).toReturnWith(true);
		expect(todosAddItemSpy).toBeCalledWith(item);
		expect(isTodoAdded).toBeTruthy();
		expect(todos.checkListSize()).toEqual(1);
	});
	test('given a 13 years old user adding 2 items with the same name, only 1 should be added', () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');
		const todos = user.todos;

		let isTodoAdded = user.addTodo(new Item('some todo', 'something', moment()));
		isTodoAdded = user.addTodo(new Item('some todo', 'other something', moment().add(1, 'hour')));

		expect(isTodoAdded).toBeFalsy();
		expect(todos.checkListSize()).toEqual(1);
	});

	test('given a 13 years old user adding 11 items, the todolist should have 10 items max and an error is thrown', () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');
		const todos = user.todos;
		const addTodo = (i: number) => {
			user.addTodo(new Item(`some todo ${i}`, 'other something', moment().add(i, 'hour')));
		};

		let isTodoAdded;

		try {
			for (let i = 1; i <= 11; i++) {
				isTodoAdded = addTodo(i);
			}
		} catch (err) {
			expect(addTodo).toThrow("max size : can't add new item due to max size");
			expect(isTodoAdded).toBeFalsy();
			expect((err as Error).message).toEqual("max size : can't add new item due to max size");
			expect(todos.checkListSize()).toEqual(10);
		}
	});
});
