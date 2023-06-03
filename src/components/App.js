import React, { useState, useEffect  } from 'react';
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from './Header';
import Main from './Main';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then(([userData, cards]) => {
        setCurrentUser(userData);

        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
  }
  ///Avatar
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then(newAvatar => setCurrentUser(newAvatar))
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  ///Card
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
    .changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  } 
  function handleConfirmDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setDeletedCard(card);
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }
////User
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(info) {
    api
      .setUserInfo(info)
      .then((newInfo) => {setCurrentUser(newInfo)
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }
///Place
function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
}
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard )=> {setCards([newCard, ...cards])
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }
  
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <div className="container">
        <Main 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmDelete}
          onUpdateUser={handleUpdateUser}
          cards={cards}
          />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        
         <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
          card={deletedCard}
        />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>  
      </CurrentUserContext.Provider>    
    </div>
    );
}

export default App;
