import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
//import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);
  const [elements, setElements] = React.useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([user, elements]) => {
        setCurrentUser(user)
        setElements(elements);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  },
    [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newElement) => {
        setElements((elements) => elements.map((c) =>
          (c._id === card._id ? newElement : c)))
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setElements((setDelete) => setDelete.filter((c) =>
          c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar(avatarEdit) {
    api.updateUserAvatar(avatarEdit)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  function handleUpdateUser(userData) {
    api.updateUserInfo(userData)
      .then((userDataBase) => {
        setCurrentUser(userDataBase)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  };

  function handleAddPlaceSubmit(card) {
    api.createCard(card)
      .then((newElement) => {
        setElements([newElement, ...elements]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          editProfile={handleEditProfileClick}
          editAvatar={handleEditAvatarClick}
          addCard={handleAddPlaceClick}
          openPhoto={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlace={handleAddPlaceClick}
          elements={elements}
        />

        <EditProfilePopup
          popupOpen={isEditProfilePopupOpen}
          popupClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          popupOpen={isEditAvatarPopupOpen}
          popupClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          popupOpen={isAddPlacePopupOpen}
          popupClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* <PopupWithForm
          name="deletephoto"
          popupTitle="Вы уверены?"
          button="Да" /> */}

        <ImagePopup
          card={selectedCard}
          popupClose={closeAllPopups}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App
