import React, {ReactNode} from 'react';
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {Home} from "../pages/Home";
import {PostPage} from "../pages/PostPage";
import {Blog} from "../pages/Blog";
import {BlogEdit} from "../pages/BlogEdit";
import {Profile} from "../pages/Profile";
import {LoginLayout} from "../layouts/LoginLayout";
import {Login} from "../pages/Login";
import {Registration} from "../pages/Registration";

interface Route {
  path: string,
  component: ReactNode,
}

interface Layout extends Route{
  routes: Route[]
}

const layouts: Layout[] = [
  // main layout
  {
    path: '/',
    component: <MainLayout />,
    routes: [
      {
        path: '/',
        component: <Home />
      },
      {
        path: '/post/:id',
        component: <PostPage />
      },
      {
        path: 'blog',
        component: <Blog />
      },
      {
        path: '/blog-edit',
        component: <BlogEdit />
      },
      {
        path: '/profile',
        component: <Profile />
      }
    ]
  },
  // Login & Registration layout
  {
    path: '/login',
    component: <LoginLayout />,
    routes: [
      {
        path: '/login',
        component: <Login />
      },
      {
        path: '/login/new-user',
        component: <Registration />
      },
    ],
  },
]

export const AppRouter = () => {
  return (
    <Routes>
      {
        Object.entries(layouts).map(([, value]) => (
          <Route
            key={value.path}
            path={value.path}
            element={value.component}
          >
            {value.routes.map((route) => <Route key={route.path} path={route.path} element={route.component}/>)}
          </Route>
        ))
      }
    </Routes>
  );
};