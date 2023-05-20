function Card(props) {

  function handleClick() { props.onCardClick(props.card) }

  return (
    <div className="element">
      <img className="element__photo" src={props.card.link} alt="Фото из карточки" onClick={handleClick} />
      <button className="element__button-delete link" type="button" />
      <div className="element__content">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__button">
          <button className="element__button-like link" type="button" name="like-button" />
          <span className="element__button-quantity">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;