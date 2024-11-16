import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ProtectedRoute } from '../protected-routes';
import React, { useEffect } from 'react';
import { useAction } from '../../hooks/useAction';
import { ingredientsActions } from '../../services/selector/slices/ingredients-slice/ingredients-slice';
import { userActions } from '../../services/selector/slices/user-slice/user-slice';
import { orderActions } from '../../services/selector/slices/order-slice/order-slice';
import { ContentWithoutHistory } from '../../pages/content-without-history/content-without-history';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const { getIngredientsThunk } = useAction(ingredientsActions);
  const { checkUserAuth, authChecked } = useAction(userActions);

  useEffect(() => {
    getIngredientsThunk();
  }, []);

  useEffect(() => {
    checkUserAuth()
      .unwrap()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => authChecked());
  }, [authChecked]);

  const modalClose = () => {
    history.back();
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />

          <Route path='/feed'>
            <Route index element={<Feed />} />
            <Route
              path=':number'
              element={
                <ContentWithoutHistory>
                  <OrderInfo />
                </ContentWithoutHistory>
              }
            />
            )
          </Route>

          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route path='/profile'>
            <Route index element={<Profile />} />
            <Route path='orders'>
              <Route index element={<ProfileOrders />} />
              <Route
                path=':number'
                element={
                  <ProtectedRoute>
                    <ContentWithoutHistory>
                      <OrderInfo />
                    </ContentWithoutHistory>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          <Route
            path='/ingredients/:id'
            element={
              <ContentWithoutHistory>
                <IngredientDetails />
              </ContentWithoutHistory>
            }
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal onClose={modalClose} title='Детали заказа'>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal onClose={modalClose} title='Детали ингредиента '>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal onClose={modalClose} title='Детали заказа'>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
