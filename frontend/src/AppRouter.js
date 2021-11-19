import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'
import Layout from 'view/layout'
import NotFound404 from 'view/error/notFound'
import { LoadingIndicator, PrivateRoute } from 'component'
import { FE_ROUTE } from 'config'
import { MiscUtils } from './utils'

const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <LoadingIndicator />,
  })

const publicRoutes = [
  // ----- Auth -----
  {
    path: FE_ROUTE.AUTH.REGISTER,
    exact: true,
    component: loadable(() => import('view/auth/AuthView')),
  },
  {
    path: FE_ROUTE.AUTH.LOGIN,
    exact: true,
    component: loadable(() => import('view/auth/AuthView')),
  },
  {
    path: FE_ROUTE.AUTH.LOGOUT,
    exact: true,
    component: loadable(() => import('view/auth/Logout')),
  },
  {
    path: FE_ROUTE.ERROR.FORBIDDEN,
    exact: true,
    component: loadable(() => import('view/error/forbidden')),
  },
  {
    path: FE_ROUTE.ERROR.FORBIDDEN_LOGOUT,
    exact: true,
    component: loadable(() => import('view/error/forbiddenLogout')),
  },
  {
    path: FE_ROUTE.ACTIVATE.REGISTRATION,
    exact: true,
    component: loadable(() => import('view/activate/ActivateRegistrationView')),
  },
  {
    path: FE_ROUTE.ACTIVATE.FORGOT_PASSWORD,
    exact: true,
    component: loadable(() => import('view/activate/ActivateForgotPasswordView')),
  },

  // ----- Home -----
  {
    path: '/',
    exact: true,
    component: loadable(() => import('view/home')),
  },

  // ----- Contest -----
  {
    path: FE_ROUTE.CONTEST.HOME,
    exact: true,
    component: loadable(() => import('view/contest')),
  },
  {
    path: FE_ROUTE.CONTEST.PUBLIC,
    exact: true,
    component: loadable(() => import('view/contest/public')),
  },
  {
    path: FE_ROUTE.CONTEST.PRIVATE,
    exact: true,
    component: loadable(() => import('view/contest/private')),
  },
  {
    path: `${FE_ROUTE.CONTEST.HOME}/(public|private)/:id`,
    exact: true,
    component: loadable(() => import('view/contest/detail')),
  },
  // ----- Training -----

  // ----- News -----
  {
    path: FE_ROUTE.NEWS.HOME,
    exact: true,
    component: loadable(() => import('view/News')),
  },
  {
    path: '/news/:newsId',
    exact: true,
    component: loadable(() => import('view/News/NewsDetail')),
  },

  // ----- Forums -----
  {
    path: FE_ROUTE.FORUM.HOME,
    exact: true,
    component: loadable(() => import('view/Forum')),
  },
  {
    path: '/forums/:forumId/new-topic',
    exact: true,
    component: loadable(() => import('view/Forum/CreateTopic')),
  },
  {
    path: '/forums/:forumId',
    exact: true,
    component: loadable(() => import('view/Forum/ForumDetail')),
  },
  {
    path: '/forums/topics/:topicId',
    exact: true,
    component: loadable(() => import('view/Forum/TopicDetail')),
  },

  // ----- Ranking -----
  {
    path: FE_ROUTE.RANKING.HOME,
    exact: true,
    component: loadable(() => import('view/ranking/RankingView')),
  },

  // ----- Misc -----
  {
    path: FE_ROUTE.MISC.ABOUT_US,
    exact: true,
    component: loadable(() => import('view/aboutUs/AboutUsView')),
  },
  {
    path: FE_ROUTE.MISC.TOS,
    exact: true,
    component: loadable(() => import('view/terms/TermsView')),
  },
  {
    path: FE_ROUTE.MISC.FAQ,
    component: loadable(() => import('view/faqs')),
  },
]

const privateRoutes = [
  // ----- User -----
  {
    path: FE_ROUTE.USER.CHANGE_PASSWORD,
    exact: true,
    component: loadable(() => import('view/changePassword')),
  },
  {
    path: `${FE_ROUTE.USER.PROFILE}/:id`,
    exact: true,
    component: loadable(() => import('view/ProfileInfo')),
  },
  {
    path: FE_ROUTE.USER.INFORMATION,
    exact: true,
    component: loadable(() => import('view/UserProfile')),
  },
  {
    path: FE_ROUTE.USER.TEAM_MANAGEMENT,
    exact: true,
    component: loadable(() => import('view/team')),
  },
]

export default function AppRouter({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          {publicRoutes.map((route) => (
            <Route
              key={MiscUtils.generateId()}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          {privateRoutes.map((route) => (
            <PrivateRoute
              key={MiscUtils.generateId()}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          <Route path="/" component={NotFound404} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  )
}
