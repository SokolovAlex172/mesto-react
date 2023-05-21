import { useEffect, useState } from "react";
import {api} from '../utils/Api';
import Card from "./Card";

import edit from "../image/edit.svg";
import add from "../image/add.svg";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onCardClick,
  onAddPlace
}) {
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [cards, setCards] = useState([]);

  const cardsList = cards.map(card => (
    <Card key={card._id} card={card} onCardClick={onCardClick} />
  ));

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then(([userData, cards]) => {
        setUserAvatar(userData.avatar);
        setUserName(userData.name);
        setUserDescription(userData.about);

        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__side">
          <div className="profile__avatar"
          onClick={onEditAvatar}>
            <img 
              className='profile__avatar-img'
              src={userAvatar} alt='Аватар'
               />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__text-name">{userName}</h1>
              <p className="profile__text-job">{userDescription}</p>
            </div>
            <button 
              className="profile__edit" 
              type="button"
              onClick={onEditProfile}>
                 <img className="profile__edit-image" 
                 src={edit} 
                 alt="Редактировать" />
            </button>
          </div>
        </div>
        <button className="profile__add" type="button"
         onClick={onAddPlace}>
          <img 
            className="profile__add-image" 
            src={add} alt="Добавить"
            
          />
        </button>
      </section>
      <section className="places" id="places-card">
        {cardsList}
      </section>
    </main>
  );
}
