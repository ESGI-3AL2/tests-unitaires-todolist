import moment, { Moment } from 'moment';
import ItemList from './ItemsList';
import Item from './Item';

export default class User {
    private _todos: ItemList;

    constructor(
        private email: string,
        private firstName: string,
        private lastName: string,
        private dateOfBirth: Moment,
        private password: string,
    ) {
        this._todos = new ItemList();
    }

    get todos(): ItemList {
        return this._todos;
    }

    addTodo(item: Item): Error | boolean {
        if (!this.isValid()) return false;

        return this._todos.addItem(item);
    }

    isValid() {
        const areUserSettingsSet = Boolean(
            this.email && this.firstName && this.lastName && this.dateOfBirth && this.password,
        );

        const isUserEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);

        const isPasswordLengthBetween8And40: boolean = this.password.length >= 8 && this.password.length <= 40;
        const hasPasswordAtLeast1Lowercase: boolean = /[a-z]+/.test(this.password);
        const hasPasswordAtLeast1Uppercase: boolean = /[A-Z]+/.test(this.password);
        const hasPasswordAtLeast1Digit: boolean = /\d+/.test(this.password);
        const isPasswordValid =
            isPasswordLengthBetween8And40 &&
            hasPasswordAtLeast1Lowercase &&
            hasPasswordAtLeast1Uppercase &&
            hasPasswordAtLeast1Digit;

        const isUser13YearsOldAtLeast = moment().diff(moment(this.dateOfBirth), 'years') >= 13;
        return areUserSettingsSet && isUserEmailValid && isPasswordValid && isUser13YearsOldAtLeast;
    }
}