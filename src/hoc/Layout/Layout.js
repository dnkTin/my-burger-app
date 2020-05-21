import React, { Component } from 'react';
import Aux from './../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideBar from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    render() {
        return (
            <Aux>

                <Toolbar openSideDrawer={this.sideDrawerToggleHandler} />
                <SideBar closed={this.sideDrawerCloseHandler}
                    open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}


export default Layout;