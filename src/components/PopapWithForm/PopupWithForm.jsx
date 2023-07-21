import Popup from '../Popup/Popup'
import Form from '../Form/Form'

export default function PopupWithForm({
  name,
  title,
  btnTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h2
        className={`popup__title ${
          name === "delete" && "popup__container_del"
        }`}
      >
        {title}
      </h2>

      <Form
        name={name}
        btnTitle={btnTitle}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      />
    </Popup>
  );
}

// export default function PopupWithForm({
//   name,
//   title,
//   btnTitle,
//   children,
//   isOpen,
//   onClose,
//   onSubmit,
//   isValid= true
// }) {
//   return (
//     <div className={`popup popup_type_${name}${isOpen && " popup_opened"}`} onClick={onClose}>
//       <div className={`popup__container ${name === 'delete' && 'popup__container_del'}`} onClick={(event)=> event.stopPropagation()}>
//       {/* event.stopPropagation() Это нужно для того, чтобы при клике на содержимое popup__container окно не закрывалось. */}
//         <h2 className={`popup__title`}>{title}</h2>
//         <button
//           className="popup__close"
//           type="button"
//           title="Закрыть окно"
//           aria-label="Закрыть"
//           onClick={onClose}
//         />
//         <form
//           className="popup__form popup__form-edit"
//           name={name}
//           action="#"
//           method="post"
//           onSubmit={onSubmit}
//           noValidate
//         >
//           {children}
//           <button className={`popup__btn ${isValid ?  '' : "popup__btn_disabled"}`} type="submit">
//             {btnTitle}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
