import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopapWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useCallback, useState, useEffect, useHistory } from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import Login from "./Login/Login";
import * as auth from "../utils/auth.js";
import crest from "../images/crest.svg";
import galka from "../images/galka.svg";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  // Popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopup] = useState(false);
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
    isDelPopupOpen;

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [infoTooltip, setInfoTooltip] = useState({
    message: "",
    icon: "",
    isOpen: false,
  });

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setDelPopupOpen(false);
  }, [
    setIsEditProfilePopupOpen,
    setIsAddPlacePopupOpen,
    setIsEditAvatarPopupOpen,
    setIsImagePopup,
    setDelPopupOpen,
  ]);

  const authJwt = (jwt) => {
    return auth.getContent(jwt).then((res) => {
      if (res) {
        setLoggedIn(true);
        setUserData({
          email: res.email,
          password: res.password,
        });
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authJwt(jwt);
    }
  }, []);
  useEffect(() => {
    if (loggedIn) setEmail(loggedIn.data.email);
    {
      history.push("/");
    }
  });

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
    setIsImagePopup(true);
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
    Promise.all([api.getInfo(), api.getCards()])

      .then(([resInfo, resCards]) => {
        setCurrentUser(resInfo);
        setCards(resCards);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }, []);

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

  const handleLogin = ({ formData }) => {
    return auth.authorize(formData).then((res) => {
      if (!res) throw new Error("неправильное имя или пароль");
      if (res.jwt) {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.jwt);
        navigate('/')
      }
    });
  };

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  }
  function handleRegister(data) {
    return auth
      .register(data)
      .then((response) => {
        if (response.data) { 
          setInfoTooltip({
            message: "Вы успешно зарегистрировались!",
            icon: `${galka}`,
            isOpen: true,  
          });
          navigate('/sign-in')
        }
      })
      .catch((error) => {
        if (error) {
          setInfoTooltip({
            message: `${error}`,
            icon: `${crest}`,
            isOpen: true,
          });
        }
      });
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <SendContex.Provider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  oneEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onClickCard={handleCardClick}
                  onDelete={handleDelPopupClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  email={email}
                  loggedIn={loggedIn}
                />
              }
            ></Route>
            <Route
              path="/sign-up"
              element={
                <>
                  <Header name="signup"></Header>
                  <Main name="signup" handleRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header name="signin"></Header>
                  <Main name="signin" handleLogin={handleLogin} />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Header />

          <Main
            oneEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onClickCard={handleCardClick}
            onDelete={handleDelPopupClick}
            cards={cards}
            onCardLike={handleCardLike}
          />

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
        </SendContex.Provider>
      </div>
    </currentUserContext.Provider>
  );
}
export default App;
