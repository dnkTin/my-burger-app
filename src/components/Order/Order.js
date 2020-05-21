import React from 'react';
import classes from './Order.module.css';
const order = (props) => {
    let ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    console.log(ingredients);
    const ingredientsOutput = ingredients.map(ig => (
        <span
            key={ig.name}
            style=
            {{
                textTransform: "capitalize",
                padding: "10px",
                margin: "0 10px",
                border: "1px solid #eee",
                display: "inline-block"
            }}
        >{ig.name} {ig.amount}
        </span>
    ))
    return (

        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};
export default order;