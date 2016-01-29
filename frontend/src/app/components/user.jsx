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

let User = React.createClass({

  getInitialState () {
    return { 
      letterDetails: {},
      status: {},
      done: false,
      loginStatus: DataStore.getLogin()
    }
  },

  componentDidMount () {
    ProductAPI.getStatus();
    DataStore.addChangeListener(this._rerender);
  },

  componentWillUnmount () {
    DataStore.removeChangeListener(this._rerender);
  },

  _rerender() {
    this.setState({letterDetails: DataStore.getProduct(), status: DataStore.getStatus()});
    if (this.state.letterDetails.error) this.refs.errorAlert.show();
  },

  render() {
    var returnVar = (<div></div>);
    var image ="";
    var statusSection ="";
    var errorMessage = "Unspecified Error!";
    var response = this.state.letterDetails;
    var status = this.state.status;

    if (this.state.loginStatus.role == 'maintainer') this.context.router.transitionTo('/admin');

    $(document).ready(function() {
      $("body").css("background-color", "#444F5C");
    });

    if (this.state.inputError) errorMessage = this.state.inputError;
    
    var response = this.state.letterDetails;
    
    if (response.error) errorMessage = response.error;

    if (response.urlImage) image = (
      <div>
        <p style={{marginTop: '40px', fontSize: '12px'}}>Your request is being processed, here is the expected result</p>
        <img src={response.urlImage} alt="getcontext" width="200px" />
      </div>
    ); 

    if (status.method) statusSection = (
      <div>
        <p style={{marginTop: '40px', fontSize: '20px', fontWeight: '600'}}>Status:</p>
        <p style={{marginTop: '5px', fontSize: '16px'}}>{status.method}</p>
      </div>
    );

    if (response.done) {
      image ="";
    }

    let textFieldStyle = {
      display: 'block', 
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#686868' 
    };

    if (this.state.loginStatus.role == 'user') returnVar = (
        <div className="landingWrapper">
          <Snackbar ref="errorAlert" message={errorMessage} style={{top: '16px', backgroundColor: 'darkred'}}autoHideDuration={5000}/>
          <div style={{textAlign: 'center'}}>
          <img src="./logo_light.png" alt="getcontext" width="120px" />
           <h3 style={{color: '#ECEFF1'}}>{"Letter Creation Page"}</h3>
          <Paper className="loginWrapper">
            <form autoComplete="off" onSubmit={this._handleSubmit}>
            <TextField style={textFieldStyle} ref="letter" floatingLabelText="Enter a Letter" />
            <br />
            <div style={{textAlign: 'center'}}>
            <RaisedButton label="Submit" type="submit" primary={true} />
            <br />
            {image}
            {statusSection}
            </div>
            </form>
          </Paper>
          <br />
          </div>

          <br />
          <br />

        </div>
      );

      return returnVar;
  },

  _handleSubmit(e) {
    e.preventDefault();
    var letter = this.refs.letter.getValue();
    if (letter.length > 1 || !letter.match(/[a-z]/i)) {
      this.setState({inputError: "Please enter ONE letter only..."});
      this.refs.errorAlert.show();
      return;
    }
    ProductAPI.getLetter(letter);
    this.refs.letter.blur();
  }

});

User.contextTypes = {
  router: React.PropTypes.func
};

module.exports = User;