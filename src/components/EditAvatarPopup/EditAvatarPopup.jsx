
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopapWithForm/PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();
  function resetOfClose() {
    onClose();
    reset();
  
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: values.avatar  }, reset);
  }
  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      btnTitle="Обновить"
      isOpen={isOpen}
      onClose={resetOfClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__elements">
        <input
          className={`popup__element ${
            isInputValid.avatar === undefined || isInputValid.avatar
              ? ""
              : "popup__element_invalid"
          }`}
          type="url"
          name="avatar"
          id="ava"
          placeholder="Ссылка на картинку"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_avatar">
          {errors.avatar}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
