import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const { editProfile, editAvatar, addCard, openPhoto } = props;

  const [userName, setUserName] = React.useState(" ");
  const [userAvatar, setUserAvatar] = React.useState(" ");
  const [userDescription, setUserDescription] = React.useState(" ");
  const [elements, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserAvatar(userData.avatar);
        setUserDescription(userData.about);
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`);
      })
  },
    [])

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar">
            <button className="profile__avatar-editbutton" type="button" onClick={editAvatar}>
              <img className="profile__avatar link" src={userAvatar} alt="Изображение аватара пользователя" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__editbutton link" type="button" onClick={editProfile}>
              </button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button className="profile__addbutton link" type="button" onClick={addCard}></button>
      </section>
      <section className="elements">
        {elements.map((card) => { return (<Card key={card._id} card={card} onCardClick={openPhoto} />) })}
      </section>
    </main>
  )
}

export default Main;

