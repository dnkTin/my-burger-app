import React, { Component } from "react";
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',

                },
                value: '',

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',

                },
                value: '',

            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',

                },
                value: '',

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',

                },
                value: '',

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',

                },
                value: '',
            },
            deliveryMehthod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: '',

            },
        },
        loading: false
    };

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // copy mot cai object trong form ra
        const updateFormElement = { ...updatedOrderForm[inputIdentifier] };
        // chi gan gia tri cho no
        updateFormElement.value = event.target.value;
        // update lai property trong form do
        updatedOrderForm[inputIdentifier] = updateFormElement;

        this.setState({
            orderForm: updatedOrderForm
        });
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        this.props.history.push('/checkout');
        // set the loading state to true to show the spinner
        this.setState({
            loading: true
        });
        // let ingredients = [];
        // Object.keys(this.props.ingredients).forEach((ele) => {
        //     for (let i = 1; i <= this.props.ingredients[ele]; i++) {
        //         ingredients.push(ele);
        //     }
        // });
        // [salad, salad, sald, bacon, baocon]
        const data = {
            // ingredients: this.props.ingredients[0],
            price: this.props.totalPrice,
            order: formData,
            ingredients: this.props.ingredients

        };
        console.log('---------');
        console.log(data);
        Axios.post('/orders.json', data).then((response) => {
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
        let formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            )
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map((ele) => (
                    <Input
                        key={ele.id}
                        elementType={ele.config.elementType}
                        elementConfig={ele.config.elementConfig}
                        value={ele.config.value}
                        changed={(event) => { this.inputChangeHandler(event, ele.id) }}
                    />
                ))}
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