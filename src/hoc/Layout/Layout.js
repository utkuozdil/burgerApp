import React, { useState } from "react";
import { connect } from 'react-redux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = props => {
    const [sideDrawerIsVisible, setSideDrawerVisibility] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisibility(!sideDrawerIsVisible);
    }

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuthenticated} />
            <SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} isAuth={props.isAuthenticated} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);