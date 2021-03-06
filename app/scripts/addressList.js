/*global React*/
var app = app || {};
(function() {
    'use strict';
    app.AddressList = React.createClass({
        onClickRemove: function(e) {
            e.preventDefault();
            this.props.onRemoveAddress(e.currentTarget.dataset.address);
        },

        onClickAddress: function(e) {
            this.props.onClickAddress(e.currentTarget.innerText);
        },

        render: function() {
            return (
                <div>
                    {(this.props.loading)? 'loading...' : ''}
                    <ul className="address-list">
                    {this.props.addresses.map(function(address) {
                        return <li className={(this.props.activeAddress === address)? 'active' : ''}>
                            <button
                                onClick={this.onClickAddress}
                                className="btn-link">{address}
                                </button>
                            <button
                                data-address={address}
                                onClick={this.onClickRemove}
                                className="btn-link pull-right">x</button>
                                </li>;
                    }.bind(this))}
                    </ul>
                </div>
            );
        }
    });
}());