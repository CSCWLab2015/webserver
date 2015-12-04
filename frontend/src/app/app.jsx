(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let Fluxible = require('fluxible');
  let ProductAPI = require('./api/productAPI');

  let Router = require('react-router');  
  let { DefaultRoute, Link, Route, RouteHandler, Redirect, NotFoundRoute } = Router;

  let Main = require('./components/main.jsx');
  let NotFound = require('./components/notFound.jsx');
  let User= require('./components/user.jsx');
  let Admin= require('./components/maintainer.jsx');
  let Login= require('./components/login.jsx');


  // Load Mock Product Data into localStorage
  // ProductData.init();

  // Load Mock API Call
  // ProductAPI.getProductData();

  // let app = new Fluxible({
  //   component: React.createFactory(require('./components/main.jsx'))
  // });

  // app.registerStore(require('./stores/dataStore'));

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

    let AppRoutes = (
    <Route name="root" path="/" handler={Main}>
      <Route name="user" path="user" handler={User} />
      <Route name="admin" path="admin" handler={Admin} />
      <Route name="login" path="login" handler={Login} />
      <Redirect from="/" to="login" />
      <NotFoundRoute handler={NotFound} />
    </Route>
  );

// let AppRoutes = (
//     <Route name="root" path="/" handler={Main}>
//       <Route name="about" path="/about/:company" handler={About} />
//       <Route name="notFound" path="/notFound" handler={NotFound} />
//       <Route name="advanced" path="/advanced" handler={Advanced} />
//       <Redirect from="/" to="advanced" />
//       <NotFoundRoute handler={NotFound} />
//     </Route>
//   );

  Router.create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    }).run(function (Handler) {  
    React.render(<Handler/>, document.getElementById('app'));
  });

})();