import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {
    const [isPurchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey]
        }).reduce((sum, element) => {
            return sum + element
        }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated)
            setPurchasing(true);
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key] <= 0

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    if (props.ings) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ings} />
                <BuildControls ingredientAdd={props.onIngredientAdded}
                    ingredientRemove={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    purchase={purchaseHandler}
                    isAuth={props.isAuthenticated} />
            </React.Fragment>
        );
        orderSummary = <OrderSummary ingredients={props.ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={props.price} />;
    }

    return (
        <React.Fragment>
            <Modal show={isPurchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));