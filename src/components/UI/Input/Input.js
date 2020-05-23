import React from 'react';
import classes from './Input.module.css';
const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        console.log('come here');
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />
            break;
        case ('select'):
            inputElement = (<select
                onChange={props.changed}
                className={inputClasses.join(' ')}
                value={props.value}>
                {props.elementConfig.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />;

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}


export default input;