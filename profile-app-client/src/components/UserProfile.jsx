import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service'; // <-- import authService

const UserProfile = () => {
  const { user, isLoading, logOutUser, updateUser, isLoggedIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div>Please log in to view your profile</div>;
  }

  const updatePhoto = () => {
    const storedToken = localStorage.getItem('authToken');
    const imageUrl = prompt('Enter image URL:');

    if (!imageUrl) return;

    authService
      .editUser({ image: imageUrl }, storedToken)
      .then((response) => {
        updateUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card">
      <div className="profile-container">
        <div className="left-side">
          <h1 className="title">Profile</h1>

          {user && (
            <>
              <p className="field-label">Username</p>
              <h3>{user.username}</h3>

              <p className="field-label">Campus</p>
              <h3>{user.campus}</h3>

              <p className="field-label">Course</p>
              <h3>{user.course}</h3>

              <button onClick={logOutUser} className="btn logout">
                Logout
              </button>
            </>
          )}
        </div>

        <div className="right-side">
          {user?.image ? (
            <img src={user.image} alt="profile" className="image-profile" />
          ) : (
            <div className="image-placeholder">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="35" r="20" fill="#aaa" />
                <ellipse cx="50" cy="85" rx="35" ry="25" fill="#aaa" />
              </svg>
            </div>
          )}
          <button onClick={updatePhoto} className="btn edit-photo">
            Edit Photo
          </button>
          <p className="upload-note">
            The user is able to upload a new profile photo, using NodeJS and
            Multer uploader.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
