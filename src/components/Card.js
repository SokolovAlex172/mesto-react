export default function Card({ card: {id,  link, name, likes }, onCardClick }) {
  function handleClick() {
    onCardClick({ link, name });
  }

  return(
    <article className="places__item" id={id}>
      <button
        className="places__delete" 
        type="button"/>
      <img className="places__image" 
        src={link} 
        alt={name}
        onClick={handleClick}
      />
      <div className="places__info">
        <h2 className="places__info-title">{name}</h2>
        <button 
          className="places__like" 
          type="button">
          </button>
        <p className="places__like-counter">{likes.length}</p>
      </div>
    </article>
  );
}