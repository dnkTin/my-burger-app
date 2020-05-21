import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    state = {
        ingredients: [],
        totalPrice: 0,
    }
    componentDidMount() {
        let ingredients = [];
        console.log(this.props.location.search);
        let query = new URLSearchParams(this.props.location.search);
        let totalPrice = 0;
        // console.log(query);
        for (let param of query.entries()) {
            if (param === 'price') {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = param[1];
            }
        }
        this.setState({
            ingredients,
            totalPrice
        });
    }
    checkoutCancelledHandler = () => {
        console.log('heeeeeeeeeeeeeee');
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                {/* loading contact dât by route herer --> provide contactdata component in here */}

                {/* passing data ingredient and price not from url param --> from props */}
                <Route path={this.props.match.path + '/contact-data'} render={(props) =>
                    <ContactData
                        {...props}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                    />} />
            </div>
        );
    }
}

export default Checkout;