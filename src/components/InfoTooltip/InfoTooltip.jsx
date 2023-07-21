import Popup from "../Popup/Popup";

export default function InfoTooltip({ name, isOpen, onClose, ...props }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <img className="popup__info-icon" src={props.icon} alt={props.message} />
      <p className="popup__info-text">{props.message}</p>
    </Popup>
  );
}
