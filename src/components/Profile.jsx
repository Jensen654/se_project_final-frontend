import "./blocks/Profile.css";
import SideBar from "./SideBar";
import ProfilePokemonSection from "./ProfilePokemonSection";
import EditProfileModal from "./EditProfileModal";
import LogOutModal from "./LogOutModal";

function Profile() {
  return (
    <div className="profile__page">
      <SideBar />
      <ProfilePokemonSection />
      <EditProfileModal />
      <LogOutModal />
    </div>
  );
}

export default Profile;
