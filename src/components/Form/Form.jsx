
import '../../blocks/popup/__form/popup__form.css'

export default function Form ([name, btnTitle,
    children, onSubmit,
    isValid]) {
        return (
            <form noValidate name={name} onSubmit={onSubmit}>
                {children}
                {name === 'signin' || name === 'signup' ? 
                <button className={`login__button ${isValid ?  '' : "login__button_disabled"}`}> {btnTitle}</button>
                :
                <button className={`popup__btn ${isValid ?  '' : "popup__btn_disabled"}`} type="submit">
                {btnTitle}
              </button>}
            </form>
        )
    }
