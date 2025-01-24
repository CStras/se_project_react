import "./SideBar.css";
import defaultAvatar from "../../assets/default-avatar.avif";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEdit, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="sidebar__user">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="user avatar"
          onError={(e) => {
            e.target.src = defaultAvatar;
          }}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__options">
        <button type="button" className="sidebar__edit" onClick={onEdit}>
          Edit Profile
        </button>
        <button type="button" className="sidebar__logout" onClick={onLogout}>
          Log out
        </button>
      </div>
    </>
  );
}

export default SideBar;
