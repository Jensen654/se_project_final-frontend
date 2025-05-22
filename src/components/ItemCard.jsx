import "./blocks/ItemCard.css";

function ItemCard({ name, image, idNumber, onClick, index }) {
  // console.log("id number: ", idNumber);
  const handleClick = () => {
    onClick(index);
  };

  return (
    <li className="pokemon__item-card_container" onClick={handleClick}>
      <img className="pokemon__image" src={image} alt="Pokemon" />
      <p className="pokemon__name">
        {name}: {idNumber}
      </p>
    </li>
  );
}

export default ItemCard;
