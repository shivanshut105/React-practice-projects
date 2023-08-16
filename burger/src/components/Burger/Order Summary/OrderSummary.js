import { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import classes from './OrderSummary.module.css'

class OrderSummary extends Component {
    // OrderSummary can be a functional component too.
    // componentWillUpdate=()=>{
    //     console.log("[OrderSummary] Inside componentWillUpdate")
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igkey => {
            return (
                <li key={igkey}>
                    <span>{igkey}</span>: {this.props.ingredients[igkey]}
                </li>
            )
        })
        return (
            <Aux>
                <div className={classes.OrderSummary}>
                    <h3>Your Order</h3>
                    <p>A delecious burger with following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: $ {this.props.price.toFixed(2)}</strong></p>
                    <p>Do you want to continue to checkout?</p>
                    <Button btnType='Danger' clicked={this.props.close}>Cancel</Button>
                    <Button btnType='Success' clicked={this.props.continue}>Continue</Button>
                </div>
            </Aux>
        );
    }
}

export default OrderSummary;