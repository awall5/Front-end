import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import { LoginUpPage } from "./Pages/LoginUpPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { CartPage } from "./Pages/CartPage";
import { ViewPage } from "./Pages/ViewPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { SearchPage } from "./Pages/SearchPage";

const App = () =>{
  return   (
  <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/view" element={<ViewPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
      
    </Routes>
  </BrowserRouter>
  )
}

export {App};