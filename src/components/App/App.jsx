import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  addItem,
  getItems,
  deleteCard,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import {
  register,
  login,
  checkToken,
  getToken,
  editProfile,
  setToken,
} from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 998 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegister = ({ name, email, password, avatar }) => {
    return register({ name, email, password, avatar })
      .then((data) => {
        console.log(data);
        handleLogin(email, password);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  };

  const onAddItem = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems((prevItems) => {
          return [res, ...prevItems];
        });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleDeleteCard = (_id) => {
    deleteCard(selectedCard._id)
      .then((data) => {
        console.log(data);
        console.log(_id);
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (email, password) => {
    return login({ email, password })
      .then((res) => {
        setToken(res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/");
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleEditProfile = ({ name, avatar }) => {
    if (name === undefined || name === "") {
      return editProfile({ avatar })
        .then((data) => {
          avatar = data.avatar;
          currentUser.avatar = avatar;
          closeActiveModal();
        })
        .catch(console.error);
    }

    if (avatar === undefined || avatar === "") {
      return editProfile({ name })
        .then((data) => {
          currentUser.name = name;
          closeActiveModal();
        })
        .catch(console.error);
    }

    if (name && avatar) {
      return editProfile({ name, avatar })
        .then((data) => {
          currentUser.name = name;
          currentUser.avatar = avatar;
          name = data.name;
          avatar = data.avatar;
          closeActiveModal();
        })
        .catch(console.error);
    }

    return closeActiveModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
      avatar: "",
      _id: "",
    });
    localStorage.removeItem("jwt");
    navigate("/");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token || token === "undefined") {
      return;
    }
    checkToken(token)
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleModalClose = (evt) => {
      if (
        (evt.target.classList.contains("modal_open") && evt.type === "click") ||
        evt.key === "Escape"
      ) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleModalClose);
    document.addEventListener("click", handleModalClose);

    return () => {
      document.removeEventListener("keydown", handleModalClose);
      document.removeEventListener("click", handleModalClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      onLogout={handleLogout}
                      onEdit={handleEditClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </CurrentTemperatureUnitContext.Provider>
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            handleDeleteCard={handleDeleteCard}
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            isLoggedIn={isLoggedIn}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            closeActiveModal={closeActiveModal}
            handleLogin={handleLogin}
            isOpen={activeModal === "login"}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            handleRegister={handleRegister}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "register"}
            handleLoginClick={handleLoginClick}
          />
        )}
        {activeModal === "edit" && (
          <EditProfileModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "edit"}
            onEditProfile={handleEditProfile}
          />
        )}
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
