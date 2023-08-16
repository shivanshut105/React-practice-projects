import { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/Order Summary/OrderSummary";

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        isPurchasable: false,
        showCheckout: false,
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igkey) => {
            return ingredients[igkey];
        }).reduce((res, el) => res + el, 0);
        this.setState({ isPurchasable: sum > 0 });
    }

    showCheckoutHandler = () => {
        const modalValue = this.state.showCheckout;
        this.setState({ showCheckout: !modalValue })
    }

    continueCheckoutHandler = () => {
        alert('You continue!');
    }

    cancelCheckoutHandler = () => {
        this.setState({ showCheckout: false })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICE[type];
        this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - INGREDIENT_PRICE[type];
        this.setState({ ingredients: updatedIngredient, totalPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredient);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.showCheckout} close={this.cancelCheckoutHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        continue={this.continueCheckoutHandler}
                        close={this.cancelCheckoutHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.isPurchasable}
                    showCheckout={this.showCheckoutHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;