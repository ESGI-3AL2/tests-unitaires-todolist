import moment, { Moment } from 'moment';
import User from '../src/User';

import { describe, expect, test, beforeEach } from '@jest/globals';

describe('user', () => {
	const MINIMAL_AGE: number = 13;
	let minDateOfBirth: Moment;

	beforeEach(() => {
		minDateOfBirth = moment().subtract(MINIMAL_AGE, 'years');
	});

	test('all correct information are given should be truthy', () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeTruthy();
	});
	test('empty last name should be falsy', () => {
		const user = new User('', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});
	test('empty first name should be falsy', () => {
		const now = moment();
		const user = new User('toto@email.fr', '', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});
	test('empty email should be falsy', () => {
		const user = new User('', 'prenom', 'nom', minDateOfBirth, '12345678aZ');
		const result = user.isValid();

		expect(result).toBeFalsy();
	});
	test('wrong date of birth should be falsy', () => {
		const dateOfBirth = moment().subtract(MINIMAL_AGE - 1, 'years');
		const user = new User('toto@email.fr', 'prenom', 'nom', dateOfBirth, '12345678aZ');
		const result = user.isValid();

		expect(result).toBeFalsy();
	});

	test('bad email should be falsy', () => {
		const user = new User('bad email', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});

	test('age < 13 should be falsy', () => {
		const twoYearsOldDateOfBirth = moment().subtract(2, 'years');
		const user = new User('toto@email.fr', 'prenom', 'nom', twoYearsOldDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeFalsy();
	});

	test('age >= 13 should be truthy', () => {
		const user = new User('toto@email.fr', 'prenom', 'nom', minDateOfBirth, '12345678aZ');

		const result = user.isValid();

		expect(result).toBeTruthy();
	});
});
