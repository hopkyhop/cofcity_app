import React from "react";
import { Link } from "react-router-dom";

import emptyCart from "../assets/img/empty-cart.png";

export const EmptyCart: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>☕</span>
      </h2>
      <p>
        Вероятней всего, вы еще не заказывали наши напитки.
        <br />
        Для того, чтобы заказать их, перейдите на главную страницу.
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
