import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';
const burger = (props) => {
    console.log(props);
    // console.log(props.ingredients);
    let ingredients = [];
    if (props.ingredients) {
        Object.keys(props.ingredients).forEach((ele) => {
            for (let i = 1; i <= props.ingredients[ele]; i++) {
                ingredients.push(ele);
            }
        });
    }
    /**
     * Object.keys(props.ingredients).map((igKey) => {
     *  return [...Array.from(props.ingredients[igKey])].map((val, i) => {
     *      return <BurgerIngredient key={igKey + idx} type={idKey} />;
     * })
     * }).reduce((coll, cur) => { return coll.concat(cur)}, [])
     */
    let transformIngredients = [];
    // console.log(transformIngredients);
    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding ingredients</p>
    } else {
        transformIngredients = ingredients.map((ig, idx) => {
            return <BurgerIngredient key={ig + idx} type={ig} />
        });
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient
                // type={.type}
                type='bread-top'
            />

            {transformIngredients}
            <BurgerIngredient
                // type={props.type}
                type='bread-bottom'
            />
        </div>
    );
}

export default withRouter(burger);