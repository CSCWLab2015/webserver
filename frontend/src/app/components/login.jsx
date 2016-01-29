let React = require('react');
let mui = require('material-ui');
let Router = require('react-router'); 
let $ = require('jquery');
//Backend
let DataStore = require('../stores/dataStore');
//React Components
let ProductAPI = require('../api/productAPI');

let {
  TextField, Paper, RaisedButton, Snackbar, CircularProgress,
} = mui;

let Login = React.createClass({

  getInitialState () {
    return { 
      userDetails: {},
      loginStatus: DataStore.getLogin(),
      loading: 'none',
      done: false
    }
  },

  componentDidMount () {
     
    DataStore.addChangeListener(this._rerender);
  },

  componentWillUnmount () {
    DataStore.removeChangeListener(this._rerender);
  },

  _rerender() {
    this.setState({userDetails: DataStore.getUser(), loginStatus: DataStore.getLogin(), loading: 'none'});
    if (this.state.userDetails.error) this.refs.errorAlert.show();
    if (this.state.userDetails.confirmation_email_code) this.refs.signupSuccess.show();
  },

  render() {
      $(document).ready(function() {
      $("body").css("background-color", "#444F5C");
  });

    if (this.state.loginStatus.role == 'user') this.context.router.transitionTo('/user');
    if (this.state.loginStatus.role == 'maintainer') this.context.router.transitionTo('/admin');


    var errorMessage = "Unspecified Error! Please contact us...";

    if (this.props.query.email) emailValue = this.props.query.email;
    if (this.state.userDetails.error) errorMessage = this.state.userDetails.error;

    let textFieldStyle = {
      display: 'block', 
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#686868' 
    };

    return (
        <div className="landingWrapper">
          <Snackbar ref="errorAlert" message={errorMessage} style={{top: '16px', backgroundColor: 'darkred'}}autoHideDuration={5000}/>
          <Snackbar ref="signupSuccess" message="Validation link sent, please check your inbox or spam folder..." style={{top: '16px'}} autoHideDuration={5000}/>
          <div style={{textAlign: 'center'}}>
           <img src="./logo_light.png" alt="getcontext" width="120px" />
           <h3 style={{color: '#ECEFF1'}}>{"Login Page"}</h3>
          <Paper className="loginWrapper">
            <form autoComplete="off" onSubmit={this._handleSubmit}>
            <TextField style={textFieldStyle} ref="username" floatingLabelText="Username"  />
            <TextField style={textFieldStyle} ref="password" floatingLabelText="Password" type="password"/>
            <br />
            <div style={{textAlign: 'center'}}>
            <CircularProgress style={{position: 'absolute', display:this.state.loading,top: '460px', left: '635px'}} mode="indeterminate" size={0.5} />
            </div>
            <div style={{overflow: 'hidden', paddingTop: '20px'}}>
              <div style={{marginTop: '30px', marginBottom: '5px'}}>
                  <RaisedButton label="Log In" type="submit" primary={true} />
              </div>
            </div>
            </form>
          </Paper>
          <br />
          </div>

          <br />
          <br />

        </div>
      );
  },

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: 'inline'});
    var details = {
      "username" : this.refs.username.getValue(),
      "password" : this.refs.password.getValue()
    }

    ProductAPI.login(details);

    this.refs.username.clearValue();
    this.refs.password.clearValue();
    this.refs.username.blur();
    this.refs.password.blur();

    // this.context.router.transitionTo('/advanced');
  }

});

Login.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Login;