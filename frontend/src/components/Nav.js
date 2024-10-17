
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Nav = () => {
//   const auth = localStorage.getItem('user'); // Check if the user is logged in
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem('user');
//     navigate('/signup');
//   };

//   const handleProtectedClick = (path) => {
//     if (auth) {
//       navigate(path); // If logged in, navigate to the protected route
//     } else {
//       alert('You need to log in first!');
//       navigate('/signup'); // Redirect to signup/login if not authenticated
//     }
//   };

//   return (
//     <div>
//       <ul className="nav-ul">
//         <li onClick={() => handleProtectedClick('/')}>Products</li>
//         <li onClick={() => handleProtectedClick('/add')}>Add Products</li>
//         <li onClick={() => handleProtectedClick('/update')}>Update Products</li>
//         <li onClick={() => handleProtectedClick('/profile')}>Profile</li>
//         {auth ? (
//           <li>
//             <button onClick={logout}>Logout</button>
//           </li>
//         ) : (
//           <li>
//             <Link to="/signup">Login</Link>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Nav;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user'); // Check if user is logged in
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear(); // Clear all local storage data
    navigate('/signup'); // Redirect to signup page after logout
  };

  const handleProtectedClick = (path) => {
    if (auth) {
      navigate(path); // Navigate if user is logged in
    } else {
      alert('You need to log in first!');
      navigate('/signup'); // Redirect to signup if not authenticated
    }
  };

  return (
    <nav>
      <ul className="nav-ul nav-right">
        {/* Conditionally render protected routes if user is logged in */}
        {auth ? (
          <>
            <li onClick={() => handleProtectedClick('/')}>Products</li>
            <li onClick={() => handleProtectedClick('/add')}>Add Products</li>
            <li onClick={() => handleProtectedClick('/update')}>Update Products</li>
            <li onClick={() => handleProtectedClick('/profile')}>Profile</li>
            <li>
              <button onClick={logout} to ="/signup">Logout({JSON.parse(auth).name})</button>
            </li>
          </>
        ) : (
          // Show login/signup options if not logged in
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
