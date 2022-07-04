import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";


const HeaderCartButton = props => {
    const [btnPulse, setBtnPulse] = useState(false)
    const cartCtx = useContext(CartContext)
    const { items } = cartCtx

    const numberOfCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount
    }, 0)


    const btnClasses = `${classes.button} ${btnPulse ? classes.bump : ""}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnPulse(true)

        const timer = setTimeout(() => {
            setBtnPulse(false)
        }, 300)

        return () => { clearTimeout(timer) }
    }, [items]
    )

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton