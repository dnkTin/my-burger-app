import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
const navigationItem = (props) => (
    <li className={classes.NavigationItem}
    >
        <NavLink
            exact={props.exact}
            // them exact bo vi tat ca moi route deu bat dau bang slash / nen phai them vao de phan biet voi cac route khac nhaus
            to={props.link}
            activeClassName={classes.active}
        // className={props.active ? classes.active : null} active class co san trong NavLink
        >{props.children}
        </NavLink>
    </li>
)
export default navigationItem;