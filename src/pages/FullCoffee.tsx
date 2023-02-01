import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullCoffee: React.FC = () => {
  const [coffee, setCoffee] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchCoffee() {
      try {
        const { data } = await axios.get(
          "https://6396ee4877359127a026d8f5.mockapi.io/items/" + id
        );
        setCoffee(data);
      } catch (error) {
        alert("Произошла ошибка. Повторите попытку позже.");
        navigate("/");
      }
    }
    fetchCoffee();
  }, []);

  if (!coffee) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <img className="coffee-block__image" src={coffee.imageUrl} alt="Coffee" />
      <h4 className="coffee-block__title">{coffee.title}</h4>
      <h4 className="coffee-block__price">от {coffee.price}p</h4>
      <br></br>
      <Link to="/" className="button button--outline button--add">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullCoffee;
