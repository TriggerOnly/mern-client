import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuth, selectIsAuth } from "./redux/slices/auth";
import { TagPosts } from "./components/TagPosts/TagPosts";

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    dispatch(fetchAuth())
  }, [])
  
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path ="/" element={ <Home />}/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost />}/>
          <Route path="/add-post" element={<AddPost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="/tags/:tag" element={<TagPosts />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
