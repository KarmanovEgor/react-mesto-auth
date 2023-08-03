import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopapWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useCallback, useState, useEffect } from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import * as auth from "../utils/auth.js";
import { Navigate, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {register, authorize, getContent} from "../utils/auth.js";
import ProtectedMain from "./ProtectedMain/ProtectedMain";

function App() {
  const navigate = useNavigate();
  // Popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDelPopupOpen, setDelPopupOpen] = useState(false);
  // Context
  const [currentUser, setCurrentUser] = useState({});
  // Card
  const [cards, setCards] = useState([]);
  // удаление карточки
  const [deleteCardId, setDeleteCardId] = useState("");
  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    isDelPopupOpen ||
    isInfoTooltipPopupOpen;
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false)
  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setDelPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }, [
    setIsEditProfilePopupOpen,
    setIsAddPlacePopupOpen,
    setIsEditAvatarPopupOpen,
    setIsImagePopupOpen,
    setDelPopupOpen,
    setIsInfoTooltipPopupOpen,
  ]);
  // useEffect(() => {
  //   if (localStorage.jwt) {
  //     console.log(localStorage)
  //     getContent(localStorage.jwt)
  //       .then(res => {
  //         console.log(res)
  //           setLoggedIn(true);
  //           setUserEmail(res.data.email);
  //           navigate("/")}) 
  //           .catch(er=> console.error(`ошибка при авторизации ${er} err`))
  //         } else {
  //           setLoggedIn(false)}},
  //         [navigate])
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getContent(token)
        .then((res) => {
          console.log(res)
          if (res.data) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/");
          } else {
            navigate("/signin");
          }
        })
        .catch(() => {
          navigate("/signin");
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (!isOpen) return;

    function handleESC(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen, closeAllPopups]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDelPopupClick(cardid) {
    setDeleteCardId(cardid);
    setDelPopupOpen(true);
  }

  // я бы сделал отдельным компонентом, это было бы правильнее?
  function handleCardLike(card) {
   
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    
   
   

    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getInfo(), api.getCards()])

      .then(([resInfo, resCards]) => {
        setCurrentUser(resInfo);
        setCards(resCards);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }}, [loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((el) => {
            return el._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((el) => {
        setCurrentUser(el);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setUserAva(dataUser)
      .then((el) => {
        setCurrentUser(el);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    api
      .addCard(dataCard)
      .then((el) => {
        setCards([el, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleRegister(password, email) {
    register(password, email)
      .then((response) => {
        setIsInfoTooltipPopupOpen(true)
         setIsSuccessful(true)
          navigate("/signin")
        })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${error}`)
      })  
  }
  function handleLogin (password, email) {
    authorize(password, email)
    .then((res) => {
    
        setLoggedIn(true);
        localStorage.setItem("token", res.token);
        navigate("/");
      })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при авторизации ${error}`)
      }) 
    
  };

  return (
    <currentUserContext.Provider value={{ currentUser, userEmail, loggedIn }}>
      <div className="page__content">
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute
                element = {ProtectedMain}
                oneEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onClickCard={handleCardClick}
                onDelete={handleDelPopupClick}
                cards={cards}
                onCardLike={handleCardLike}
                userEmail={userEmail}
                loggedIn={loggedIn}
                replace={true}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header name="signup" />
                <Main name="signup" handleRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header name="signin" />
                <Main name="signin" handleLogin={handleLogin} />
              </>
            }
          />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
  
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnTitle="Да"
          isOpen={isDelPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name="result"
          isSuccessful={isSuccessful}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups} 
        />
      </div>
    </currentUserContext.Provider>
  );
}
export default App;


  