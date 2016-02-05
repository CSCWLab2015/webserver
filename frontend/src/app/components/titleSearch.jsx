let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');  
let _ = require('lodash'); 
let { DefaultRoute, Link, Route, RouteHandler } = Router;
let ProductAPI = require('../api/productAPI');
let DataStore = require('../stores/dataStore');

let {
  TextField, RaisedButton, SelectField, DropDownIcon, Avatar
} = mui;

let TitleSearch = React.createClass({

  getInitialState () {
    return { 
      loginStatus : this.props.loginStatus
    }
  },

  componentDidMount () {
    DataStore.addChangeListener(this._rerender);
  },

  componentWillUnmount () {
    DataStore.removeChangeListener(this._rerender);
  },

  _rerender() {
    this.setState({loginStatus: DataStore.getLogin()});
  },

  render() {
    // if (!this.state.loginStatus.status) this.context.router.transitionTo('/login');

     var menuList = [      
      { route: 'logout', text: 'Logout'},
      ];

    var loggedinNav = (<div></div>);
    var role = "undefined", title="Creator";

    if (this.state.loginStatus.role) role = this.state.loginStatus.role;
    var profile = (<DropDownIcon openDirection='bottom-left' onChange={this._onUserClick} className='logoutButton' menuItems={menuList} ><Avatar>{role.charAt(0)}</Avatar></DropDownIcon>
           );

    if (role == "maintainer") title = "Maintainer";

    if (this.state.loginStatus.status ) loggedinNav = (
          <div className="grid headerGrid" >
            <div className="col" style={{padding: '0px', width: '10px', position: 'absolute'}}>    
              <img src="./logo_light.png" alt="getcontext" width="30px" />
            </div>
            <div className="col" style={{padding: '0px', paddingLeft: '20px'}}>
              <h3 className="pageTitle">{title + " Page"}</h3>
            </div>
            <div className="col" style={{padding: '0px'}}>
              {profile}
            </div>
          </div>);

    var advLabel = 'Advanced';
    if (window.location.hash.indexOf('advanced') > -1) advLabel = 'Reset';

    return (
        <div className='headerBar'>
          {loggedinNav}
        </div>
      );
  },

  _onUserClick(e, selectedIndex, menuItem){
    if (selectedIndex == 0) {
    DataStore.logout();
    this.setState({loginStatus: false});
    this.context.router.transitionTo('/login');
    }
  }

});

TitleSearch.contextTypes = {
  router: React.PropTypes.func
};

module.exports = TitleSearch;