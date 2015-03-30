'format register';
import {EventAggregator} from 'aurelia-event-aggregator';
var addresses = [];
/*jshint ignore:start*/
export class Addresses{

    static inject() {
        return [EventAggregator];
    }

    constructor(vent) {
        this._list = addresses;
        this.vent = vent;
    }

    removeItem(address) {
        var index = this._list.indexOf(address);
        if(index >= 0) {
            this._list.splice(index, 1);
        }
        this.vent.publish('addresses:removed', address);
    }

    add(address) {
        this._list.push(address);
        this.vent.publish('addresses:added', address);
    }

    list() {
        return this._list;
    }
}