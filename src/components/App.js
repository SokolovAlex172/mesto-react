import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {

    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header/>
      <div className="container">
        <Main 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          />
        <PopupWithForm
         title={"Обновить аватар"}
         name={"change-avatar"}
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}>
          <div className="form__section">
            <input 
              type="url" 
              className="form__input form__input_type_avatar" 
              name='avatar' 
              id="avatar" 
              placeholder="Ссылка на новый аватар" 
              required
            />
            <span className="avatar-error form__input-error"></span>
          </div>
          <button 
            className="form__submit" 
            type="submit">Сохранить
            </button>
        </PopupWithForm>

        <PopupWithForm
        title={"Новое место"}
        name={"place"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
          <div className="form__section">
              <input 
                type="text" 
                className="form__input form__input_type_place" 
                id="add" 
                name='add'  
                placeholder="Название"
                minLength="2" 
                maxLength="30" 
                required/>
              <span className="place-error form__input-error"></span>
              </div>
              <div className="form__section">
              <input 
                type="url"
                className="form__input form__input_type_link" 
                name='link' 
                id="link" 
                placeholder="Ссылка на картинку" 
                required/>
              <span className="link-error form__input-error"></span>
            </div>
              <button className="form__submit" type="submit">Создать</button>
        </PopupWithForm>



        <PopupWithForm
         title={"Редактировать профиль"}
         name={"edit-profile"}
         isOpen={isEditProfilePopupOpen}
         onClose={closeAllPopups}>
          <div className="form__section">
          <input 
            type="text" 
            className="form__input form__input_type_name" 
            id="names" 
            name='name' 
            placeholder="Введите имя"
            minLength="2" 
            maxLength="40" 
            required
          />
          <span className="names-error form__input-error"></span>
        </div>
        <div className="form__section">
          <input 
            type="text" 
            className="form__input form__input_type_job" 
            id="about" 
            name='about' 
            placeholder="Введите профессию" 
            minLength="2" 
            maxLength="400" 
            required
          />
          <span className="about-error form__input-error"></span>
        </div>
        <button 
            className="form__submit" 
            type="submit">Сохранить
            </button>
         </PopupWithForm>

         <PopupWithForm 
          title={"Вы уверены?"} 
          name={"confirm-delete"}>
          <button 
            className="form__submit" type="submit">
            Да, удалить карточку
          </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>      
    </div>
    );
}

export default App;
