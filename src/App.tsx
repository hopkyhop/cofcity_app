import React from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

import "./scss/app.scss";

//работает на серверных приложениях
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div className="container">Идет загрузка корзины...</div>,
});

const FullCoffee = Loadable({
  loader: () => import(/* webpackChunkName: "FullCoffee" */ "./pages/FullCoffee"),
  loading: () => <div className="container">Идет загрузка...</div>,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"),
  loading: () => <div className="container">Идет загрузка...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="coffee/:id"
          element={
            <React.Suspense>
              <FullCoffee />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
