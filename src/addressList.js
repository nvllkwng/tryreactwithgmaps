import {Behavior} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
export class AddressList {
    static inject() {
        return [EventAggregator];
    }

    constructor(vent) {
        this.vent = vent;
        this.activeAddress = null;
        this.vent.subscribe('addresses:added', function(address) {
            this.activeAddress = address;
        }.bind(this));
    }

    static metadata() {
        return Behavior
            .withProperty('addresses'); 
    }

    removeAddress(address) {
        this.addresses.removeItem(address);
    }

    onClickAddress(address) {
        this.activeAddress = address;
        this.vent.publish('focusAddress', address);
    }
}