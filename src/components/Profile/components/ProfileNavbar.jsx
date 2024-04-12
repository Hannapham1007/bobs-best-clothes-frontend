function ProfileNavbar({showState, setShowState}) {
  
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const isAdmin = loggedInUser.roles.some(role => role.name === "ROLE_ADMIN");


  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="navbar-nav mx-auto"> {}
          <p 
            className={`nav-link profile-nav ${showState === 'orders' ? 'fw-bold' : ''}`}
            onClick={() => setShowState('orders')}
          >
            Orders
          </p>
          <p
            className={`nav-link profile-nav  ${showState === 'info' ? 'fw-bold' : ''}`}
            onClick={() => setShowState('info')}
          >
            Account
          </p>
          {(isAdmin) && 
          
             <><p
              className={`nav-link profile-nav`}
              onClick={() => window.location.href = '/create-product'}
            >
              Create Product
            </p><p
              className={`nav-link profile-nav`}
              onClick={() => window.location.href = '/create-category'}
            >
                Create Category
              </p></>
   
          }
        </div>
      </div>
    </nav>
  )
}

export default ProfileNavbar