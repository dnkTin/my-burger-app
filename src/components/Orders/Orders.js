import React, { Component } from "react";
import Order from './../Order/Order';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Axios from '../../axios-orders';
class Orders extends Component {

    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        Axios
            .get('orders.json')
            .then((response) => {
                // this.setState({ orders: response.data });
                let fetchOrders = [];
                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                    this.setState({
                        loading: false,
                        orders: fetchOrders
                    });
                    console.log(this.state.orders);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                {this.state.orders.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                )
                )}
            </div>
        );
    }
}

export default withErrorHandler(Orders, Axios);