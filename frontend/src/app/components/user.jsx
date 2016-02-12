var React = require('react');
var mui = require('material-ui');
var Router = require('react-router'); 
var $ = require('jquery');
//Backend
var DataStore = require('../stores/dataStore');
//React Components
var ProductAPI = require('../api/productAPI');
var color = require('./color.json')

var {
  TextField, Paper, RaisedButton, Snackbar, CircularProgress,
} = mui;

var User = React.createClass({

  getInitialState () {
    return { 
      letterDetails: {},
      status: {},
      done: false,
      textDisabled: false,
      loginStatus: DataStore.getLogin()
    }
  },

  componentDidMount () {
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

    var returnVar = (<div></div>),
        image ="",
        colorCode = "",
        statusSection ="",
        statusPayload = "",
        errorMessage = "Unspecified Error!",
        response = this.state.letterDetails,
        status = this.state.status, statusMessage, 
        textDisabled = this.state.textDisabled,
        response = this.state.letterDetails,
        colorString;

    $(document).ready(function() {
      $("body").css("background-color", "#202021");
    });

    if (this.state.loginStatus.role == 'maintainer') this.context.router.transitionTo('/admin');

    if (this.state.inputError) {
      errorMessage = this.state.inputError;
    }
    
    if (response.error) {
      errorMessage = response.error;
    }

    if (response.urlImage) {
      
        image = (
          <div>
            <p style={{marginTop: '40px', fontSize: '12px'}}>Your request is being processed, here is the expected result</p>
            <img src={response.urlImage} alt="letter" width="200px" />
          </div>
        );
    } 

    if (status.method) {
      
      statusMessage = status.method;

      if (status.payload > 0) {
        statusPayload = Math.round(((Number(status.payload)+1)/25)*100) + " %";
      }

      if (status.code.substring(0, 1) == "9") {
        statusMessage = "ERROR: " + statusMessage;
      }

      if (status.barcode) {
        colorString = status.barcode.toString();
        colorCode = (
          <div>
          <div className="colorCode" style={{backgroundColor:color[colorString[0]]}}></div>
          <div className="colorCode" style={{backgroundColor:color[colorString[1]]}}></div>
          <div className="colorCode" style={{backgroundColor:color[colorString[2]]}}></div>
          </div>
        );
      }

      statusSection = (
        <div>
          {colorCode}
          <p style={{marginTop: '40px', fontSize: '16px', fontWeight: '600'}}>Status:</p>
          <p style={{marginTop: '5px', fontSize: '20px'}}>{statusMessage}</p>
		      <p style={{marginTop: '5px', fontSize: '16px'}}>{statusPayload}</p>
        </div>
      );
    
    }

    if (response.done) {
      textDisabled = false;
      image =(
        <div>
          <p style={{marginTop: '40px', fontSize: '12px'}}>Your request is done, you can request letter again</p>
        </div>);
    }

    var textFieldStyle = {
      display: 'block', 
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#686868' 
    };

    if (this.state.loginStatus.role == 'user') { 

        returnVar = (
          <div className="landingWrapper">
            <Snackbar ref="errorAlert" message={errorMessage} style={{top: '16px', backgroundColor: 'darkred'}}autoHideDuration={5000}/>
            <div style={{textAlign: 'center'}}>
            <Paper className="loginWrapper">
              <form autoComplete="off" onSubmit={this._handleSubmit}>
              <TextField style={textFieldStyle} ref="letter" disabled={textDisabled} floatingLabelText="Enter a Letter" />
              <br />
              <div style={{textAlign: 'center'}}>
              <RaisedButton label="Submit" type="submit" primary={true} disabled={textDisabled} />
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

      }

      return returnVar;
  },

  _handleSubmit(e) {
    var letter;
    e.preventDefault();
    
    this.setState({textDisabled: true});
    
    letter = this.refs.letter.getValue();
    if (letter.length > 1 || !letter.match(/[a-zA-Z0-9]/i)) {
      this.setState({inputError: "Please enter ONE alphanumeric only..."});
      this.refs.errorAlert.show();
      return;
    }

    ProductAPI.getLetter(letter);
    this.refs.letter.blur();
    ProductAPI.getStatus();
  }

});

User.contextTypes = {
  router: React.PropTypes.func
};

module.exports = User;