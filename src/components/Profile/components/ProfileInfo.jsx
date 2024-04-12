import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const localUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();
  console.log(localUser);

  const handleNavigate = () => {
    navigate(`/profile/${localUser.id}/edit`);
  };

  return (
    <div
      className="container text-center col-md-6 col-11 p-4 rounded-3"
      style={{ background: "var(--product-item-background)" }}
    >
      <h3 className="fw-bold text-uppercase">Your Account</h3>
      <div className="mt-3 text-start">
        <div className="row mb-0">
          <p className="col">Username: {localUser.username}</p>
          <div
            className="col d-flex justify-content-end align-items-center"
            onClick={handleNavigate}
          >
            <MdEdit className="mb-1" />
            <button className="btn btn-link fw-bold text-decoration-underline px-1">
              Edit
            </button>
          </div>
        </div>

        <p>Email: {localUser.email}</p>
        <p>First name: {localUser.firstname}</p>
        <p>Last name: {localUser.lastname}</p>

        <p>Phone: {localUser.phone}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
