import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { GlobalStyles, lightTheme } from "./styles";

// Pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Market from "./pages/Market";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <Helmet>
          <title>Exodus, the next generation of NFT market</title>
        </Helmet>
        <GlobalStyles />

        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path={`/users/:username`} element={<MyPage />} />
            <Route path="/market" element={<Market />} />
            <Route path="/create" element={<Create />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/test" element={<Test />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
