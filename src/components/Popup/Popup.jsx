import "../../blocks/popup/popup.css";

export default function Popup({ name, children, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_${name}${isOpen && " popup_opened"}`}
      onClick={onClose}
    >
      <div
        className={`${name==='img' ? 'popup__gallery' : 'popup__container'} ${name === 'result' ? 'popup__login' : ''}`}
        
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="popup__close"
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
