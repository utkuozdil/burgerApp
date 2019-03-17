import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        ingredientKey => {
            return <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {ingredientKey}: {props.ingredients[ingredientKey]}
                </span>
            </li>
            }
    );

    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType="Success"clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
    );
};

export default orderSummary;