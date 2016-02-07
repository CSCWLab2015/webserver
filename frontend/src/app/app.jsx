(function () {
  
  var React = require('react/addons'),
      injectTapEventPlugin = require('react-tap-event-plugin'),
      ProductAPI = require('./api/productAPI'),
      Router = require('react-router'),
      { DefaultRoute, Link, Route, RouteHandler, Redirect, NotFoundRoute } = Router,
      Main = require('./components/main.jsx'),
      NotFound = require('./components/notFound.jsx'),
      User= require('./components/user.jsx'),
      Admin= require('./components/maintainer.jsx'),
      Login= require('./components/login.jsx'),
      AppRoutes;

  //Needed for React Developer Tools
  window.React = React;

  injectTapEventPlugin();

  AppRoutes = (
    <Route name="root" path="/" handler={Main}>
      <Route name="user" path="user" handler={User} />
      <Route name="admin" path="admin" handler={Admin} />
      <Route name="login" path="login" handler={Login} />
      <Redirect from="/" to="login" />
      <NotFoundRoute handler={NotFound} />
    </Route>
  );

  Router.create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    }).run(function (Handler) {  
    React.render(<Handler/>, document.getElementById('app'));
  });

})();