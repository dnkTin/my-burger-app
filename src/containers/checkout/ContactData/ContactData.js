import React, { Component } from "react";
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.props.history.push('/checkout');
        // set the loading state to true to show the spinner
        this.setState({
            loading: true
        });
        // alert('Continue!');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Dang Ngoc Khanh Tin',
                address: {
                    street: 'Pham nhu tang',
                    zipcode: '550000',
                    country: 'VN'
                },
                email: 'tindang@yopmail.com'
            },
            deliveryMehthod: 'fastest'

        };
        Axios.post('/orders.json', order).then((response) => {
            this.setState({
                loading: false
            });
            console.log(response);
            this.props.history.push('/');
        }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            });
        })
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="your name" />
                <Input inputtype="input" type="text" name="email" placeholder="your email" />
                <Input inputtype="input" type="text" name="street" placeholder="your street" />
                <Input inputtype="input" type="text" name="postalCode" placeholder="your postalCode" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter you contact data:</h3>
                {form}
            </div>
        );
    }
}

export default ContactData;