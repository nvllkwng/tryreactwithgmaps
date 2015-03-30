import {Behavior} from 'aurelia-framework';
import {Addresses} from './addresses';
export class AddressForm {

    static inject() {
        return [Addresses];
    }

    constructor(addresses) {
        this.toAddAddress = '';
        this.addresses = addresses;
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.addresses.add(this.toAddAddress);
        this.toAddAddress = '';
    }

}