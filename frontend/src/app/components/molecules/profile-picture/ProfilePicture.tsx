import ImageFromApi from "../../atoms/ImageFromApi";
import "./ProfilePicture.scss";

interface ProfilePictureProps {
  avatar?: string;
  alt: string;
  size?: "small" | "large";
}

const ProfilePicture = ({
  avatar,
  alt,
  size = "small",
}: ProfilePictureProps) => {
  return (
    <div className={`profile-picture-wrapper ${size}`}>
      <div className="profile-picture">
        <ImageFromApi
          url={avatar || "avatars/default.png"}
          alt={alt}
          className="profile-picture-image"
        />
      </div>
      <div className="profile-picture-shadow"></div>
    </div>
  );
};

export default ProfilePicture;
