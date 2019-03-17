import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const modal = props => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} click={props.modalClosed} />
            <div className={classes.Modal} style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1' : '0' }}>
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default React.memo(modal, (previousProps, nextProps) => nextProps.show === previousProps.show && nextProps.children === previousProps.children);