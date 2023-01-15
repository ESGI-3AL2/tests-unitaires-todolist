import { Moment } from 'moment';

export default class Item {
	private name: string;
	private creationDate: Moment;

	constructor(name: string, private content: string, date: Moment) {
		this.checkContent(content);

		this.name = name;
		this.creationDate = date;
	}

	getDate(): Moment {
		return this.creationDate;
	}

	getItemName(): string {
		return this.name;
	}

	setItemName(itemName: string): void {
		this.name = itemName;
	}

	getContent(): string {
		return this.content;
	}

	setContent(value: string) {
		this.content = value;
	}

	setItemDate(date: Moment): void {
		this.creationDate = date;
	}

	checkContent(content: string): void | Error {
		if (content.length > 1000) {
			throw new Error('max length exceeded');
		}
	}
}
