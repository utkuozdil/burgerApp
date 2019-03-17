import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: 
            <strong>
                {props.price.toFixed(2)}
            </strong>
        </p>
        {controls.map(control => (
            <BuildControl key={control.label} 
                          label={control.label} 
                          add={() => props.ingredientAdd(control.type)} 
                          remove={() => props.ingredientRemove(control.type)}
                          disable={props.disabled[control.type]}/>
        ))}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchase}>{props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
    </div>
);

export default buildControls;