import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup({
  isOpen,
  onClose,
  onConfirmDelete,
  card
}) {
  function handleSubmit(e) {
    e.preventDefault();

    onConfirmDelete(card);
  }

  return (

    <PopupWithForm 
      title={"Вы уверены?"} 
      name={"confirm-delete"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={"Да, удалить карточку"}
      >
    </PopupWithForm>
  );
}
