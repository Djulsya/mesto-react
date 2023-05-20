import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState([]);

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

  return (
    <div className="page">
      <Header />

      <Main
        editProfile={handleEditProfileClick}
        editAvatar={handleEditAvatarClick}
        addCard={handleAddPlaceClick}
        openPhoto={handleCardClick} />

      <PopupWithForm
        popupOpen={isEditProfilePopupOpen}
        name="profile"
        popupTitle="Редактировать профиль"
        button="Сохранить"
        popupClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name"
          id="profilename-input" type="text" name="name" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className="popup__input-error popup__input-error_type_name"></span>
        <input className="popup__input popup__input_type_about"
          id="profileabout-input" type="text" name="about" placeholder="О себе"
          minLength="2" maxLength="200" required />
        <span className="popup__input-error popup__input-error_type_about"></span>
      </PopupWithForm>

      <PopupWithForm
        popupOpen={isEditAvatarPopupOpen}
        name="editavatar"
        popupTitle="Обновить "
        button="Сохранить"
        popupClose={closeAllPopups}>
        <input className="popup__input popup__input-editavatar popup__input_type_avatar"
          id="photourl-input-avatar" type="url" name="link" placeholder="Ссылка на картинку аватара" required />
        <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        popupOpen={isAddPlacePopupOpen}
        name="addphoto"
        popupTitle="Новое место"
        button="Создать"
        popupClose={closeAllPopups}>
        <input className="popup__input popup__input-addphoto popup__input-addphoto_type_title"
          id="photoname-input" type="text" name="title" placeholder="Название"
          minLength="2" maxLength="30" required />
        <span className="popup__input-error popup__input-error_type_title"></span>
        <input className="popup__input popup__input-addphoto popup__input-addphoto_type_link"
          id="photourl-input" type="url" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error popup__input-error_type_link"></span>
      </PopupWithForm>

      <PopupWithForm
        name="deletephoto"
        popupTitle="Вы уверены?"
        button="Да" />

      <ImagePopup
        card={selectedCard}
        popupClose={closeAllPopups} />

      <Footer />
    </div>
  );
}

export default App;
