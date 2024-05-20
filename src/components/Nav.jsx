// import { Link } from "react-router-dom";

// const Nav = ({ user, handleLogOut }) => {
//   let userOptions;
//   if (user) {
//     userOptions = (
//       <nav>
//         <h3>Welcome {user.email}!</h3>
//         <Link onClick={handleLogOut} to="/">
//           Sign Out
//         </Link>
//       </nav>
//     );
//   }

//   return (
//     <header>
//       <Link to="/">
//         <div className="logo-wrapper">
//           <img
//             className="logo"
//             src="https://avatars.dicebear.com/api/gridy/app.svg"
//             alt="logo"
//           />
//         </div>
//       </Link>
//       {user ? userOptions : null}
//     </header>
//   );
// };

// export default Nav;