"use strict"
//Important Modules
let React = require('react');
let Router = require('react-router');  
let { DefaultRoute, Link, Route, RouteHandler } = Router;
//Material UI
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let {FlatButton, LeftNav,AppBar,TextField,Styles,FontIcon,MenuItem,Paper,RaisedButton, Snackbar, IconButton, Dialog} = mui;
//Backend
let DataStore = require('../stores/dataStore');
//React Components
let ProductAPI = require('../api/productAPI');


let TitleSearch = require('./titleSearch.jsx');

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

let Main = React.createClass({

  getInitialState () {
    return { 
      searchString : '',
      footerVis: 'visible',
      suggestionStatus: 'none',
      clearFlag: false, 
      loginStatus : DataStore.getLogin()
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };

  },

  sanitizeSearch (e) {
    this.setState({clearFlag: false});
  },

  componentWillMount() {
    // if (!this.state.loginStatus) this.context.router.transitionTo('/login');
    ThemeManager.setPalette({
      primary1Color: Colors.grey800,
      accent1Color: Colors.lightBlue500
    });
  },

  componentDidMount () {
    window.addEventListener('hashchange', this.sanitizeSearch);
    DataStore.addChangeListener(this._rerender);
    
  },

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.sanitizeSearch);
    DataStore.addChangeListener(this._rerender);
  },

  render() {

    // console.log("render");

    // if (!this.state.loginStatus) this.context.router.transitionTo('/login');

    // console.log(this.state.loginStatus);

    let standardActions = [
  { text: 'Cancel' },
  { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit'}
];
    return (

      <div>
          <div className="topBar">
            <AppBar style={{position: 'fixed'}}
              title={<TitleSearch loginStatus={this.state.loginStatus}/>}
              showMenuIconButton={false} />
          </div>

          <div style={{paddingTop: '70px'}}>
            <RouteHandler tag={this.state.tag}/>
          </div>
            
      </div>
    );
  },

  _rerender() {
    this.setState({tagList: DataStore.getTag(), loginStatus: DataStore.getLogin()});
    // if (this.state.rowData.error) this.refs.errorAlert.show();
  }

});

Main.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Main;
