import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {
        label: 'Salad', type: 'salad'
    },
    {
        label: 'Bacon', type: 'bacon'
    },
    {
        label: 'Cheese', type: 'cheese'
    },
    {
        label: 'Meat', type: 'meat'
    }
];
const buildControls = (props) => {
    // console.log(props.disabled);
    return (
        <div className={classes.BuildControls}>
            <p>Total price: {props.price.toFixed(2)}</p>
            {controls.map((ctrl) =>
                (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                    />)
            )}
            <button
                onClick={props.ordered}
                className={classes.OrderButton}
                disabled={!props.purchaseable}>ORDER NOW</button>
        </div>)
}
export default buildControls;