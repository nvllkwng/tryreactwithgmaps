/*global React*/
var app = app || {};
(function() {
    'use strict';
    app.AddressForm = React.createClass({
        onSubmit: function(e) {
            e.preventDefault();
            var node = this.refs.address.getDOMNode();
            this.setState({address: node.value});
            this.props.onAddAddress(node.value);
            node.value = '';
        },


        getInitialState: function () {
            return {address: undefined};
        },

        render: function() {
            return (
                <form onSubmit={this.onSubmit}>
                <div >
                <input
                    val="{this.state.address}"
                    ref="address"
                    placeholder="enter address"
                    type="text"
                    className="form-control address-form"/>
                <button className="btn btn-default" type="submit">Add</button>
                </div>
                </form>
            );
        }
    });
}());