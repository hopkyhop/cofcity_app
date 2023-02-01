import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItemById } from "../../redux/cart/selectors";
import { addItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";
import { CoffeeItem } from "../../redux/coffees/types";

export const CoffeeBlock: React.FC<CoffeeItem> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
  rating
}) => {
  const [activeType, setActiveType] = React.useState<number>(types[0]);
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id));

  const typesNames = ["с кофеином", "без кофеина"];

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="coffee-block">
      <Link to={`/coffee/${id}`} key={id}>
        <img className="coffee-block__image" src={imageUrl} alt="Coffee" />
        <h4 className="coffee-block__title">{title}</h4>
      </Link>
      <div className="coffee-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={activeType === typeId ? "active" : ""}
              onClick={() => setActiveType(typeId)}
            >
              {typesNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              className={activeSize === i ? "active" : ""}
              onClick={() => setActiveSize(i)}
            >
              {size} л
            </li>
          ))}
        </ul>
      </div>
      <div className="coffee-block__bottom">
        <div className="coffee-block__price">от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {cartItem && cartItem.count > 0 && <i>{cartItem.count}</i>}
        </button>
      </div>
    </div>
  );
};
