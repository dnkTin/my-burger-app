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
                validation: {
                    required: true
                },
                valid: true,
                touched: false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',

                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false

            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',

                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: true,
                touched: false

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',

                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',

                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
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
                touched: false,
                valid: true,
                validation: {}
            },
        },
        formIsValid: true,
        loading: false
    };

    checkValidity = (value, rule) => {
        let isValid = true;
        if (rule.required) {
            isValid = value.trim() !== '';
        }
        if (rule.minLength) {
            isValid = value.length > rule.minLength;
        }

        if (rule.maxLength) {
            isValid = value.length < rule.maxLength;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // copy mot cai object trong form ra
        const updateFormElement = { ...updatedOrderForm[inputIdentifier] };
        // chi gan gia tri cho no
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;

        // update lai property trong form do
        updatedOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;

        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
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
                        invalid={!ele.config.valid}
                        touched={ele.config.touched}
                        shouldValidate={ele.config.validation}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
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