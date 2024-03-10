import { createBrowserRouter, redirect } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Homepage from "./pages/Homepage";
import CardQuote from "./components/CardQuote";
import MarvelForum from "./pages/MarvelForum";
import ProfilPage from "./pages/ProfilPage";
import UploadPage from "./pages/UploadPage";

function authHome() {
  if (localStorage.access_token) {
    return redirect("/");
  }
  return null
}
function authLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }
  return null
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
    loader: authHome,
  },
  {
    element: <Homepage />,
    loader : authLogin,
    children: [
      { path: "/", element: <CardQuote />, loader: authLogin },
      { path: "/forum", element: <MarvelForum />, loader: authLogin },
      { path: "/profile", element: <ProfilPage />, loader: authLogin },
      {path: "/upload", element : <UploadPage />, loader: authLogin}
    ],
  },
]);

export default router;
