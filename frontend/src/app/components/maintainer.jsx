var React = require('react');
var mui = require('material-ui');
var Router = require('react-router'); 
var $ = require('jquery');
//Backend
var DataStore = require('../stores/dataStore');
//React Components
var ProductAPI = require('../api/productAPI');

var {
  TextField, Paper, RaisedButton, Snackbar, DropDownMenu
} = mui;

var Login = React.createClass({

  getInitialState () {
    return { 
      letterDetails: {},
      loading: 'none',
      done: false,
      resType: "brick",
      loginStatus: DataStore.getLogin()
    }
  },

  componentDidMount () {

    ProductAPI.getRes();
     
    DataStore.addChangeListener(this._rerender);
  },

  componentWillUnmount () {
    DataStore.removeChangeListener(this._rerender);
  },

  _rerender() {
    this.setState({resDetails: DataStore.getProduct()});
    if (this.state.resDetails.message) this.refs.addSuccess.show();
  },

  render() {

    if (this.state.loginStatus.role == 'user') this.context.router.transitionTo('/user');

    var returnVar = (<div></div>);


      $(document).ready(function() {
        $("body").css("background-color", "#202021");
      });

      // console.log(this.state.resDetails);
      var table = (<div></div>);
      // var response = this.state.letterDetails;
      var errorMessage = "Unspecified Error...";
      if (this.state.inputError) errorMessage = this.state.inputError;
      var successMessage ="Test";

    if (this.state.resDetails){
    if (this.state.resDetails.message) successMessage = this.state.resDetails.message;
    var list = [];
    for (var i = 0, len=this.state.resDetails.length; i<len; i++){
          list.push(<tr key={i+12345}>
                <td >
                  <b>{this.state.resDetails[i].name}</b>
                </td>
                <td>
                  {this.state.resDetails[i].amount}
                </td>
              </tr>);
      }

      table = (<table className='table'>
            <thead>
            <th style={{textAlign: 'center'}}>Type</th>
            <th style={{textAlign: 'center'}}>Amount</th>
            </thead>
            <tbody>
            {list}
            </tbody>
          </table>);
    }



      var image ="";

     var menuItems = [
   { payload: '1', text: 'brick' },
   { payload: '2', text: 'plate' },
];

    var textFieldStyle = {
      width: '25%',
    };

    if (this.state.loginStatus.role == 'maintainer') returnVar = (
        <div className="landingWrapper">
          <Snackbar ref="errorAlert" message={errorMessage} style={{top: '16px', backgroundColor: 'darkred'}}autoHideDuration={5000}/>
          <Snackbar ref="addSuccess" message={successMessage} style={{top: '16px'}} autoHideDuration={5000}/>
          <div style={{textAlign: 'center'}}>
          <Paper className="loginWrapper">
            <h3>Adding Inventory</h3>
            <form autoComplete="off" onSubmit={this._handleSubmit}>
              <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                <DropDownMenu ref="type" menuItems={menuItems} onChange={this._change} 
                className="dropdown" style={{verticalAlign: 'top', borderTop: '0'}} />
                <TextField style={textFieldStyle}  ref="amount" hintText="Amount" />
              </div>
              <div style={{textAlign: 'center', marginTop: '10px'}}>
              <RaisedButton label="Submit" type="submit" primary={true} />
              </div>
              <br />
            </form>
            </Paper>
            <Paper className="loginWrapper">
              <h3>Summary</h3>
              {table}
          </Paper>
          </div>

        </div>
      );

  return returnVar; 
  },

   _change(e, selectedIndex, menuItem) {
    var urlCurrent = encodeURIComponent(window.location.href);
    if (selectedIndex == 0) {
      this.setState({resType: "brick"});
    }
    if (selectedIndex == 1) {
      this.setState({resType: "plate"});
    }
  },

  _handleSubmit(e) {
    e.preventDefault();

    var amount = this.refs.amount.getValue();
    if (isNaN(amount) || parseInt(amount) < 1) {
      this.setState({inputError: "Please enter POSITIVE NUMBER only..."});
      this.refs.errorAlert.show();
      return;
    }
    var details = {
      "type" : this.state.resType,
      "amount" : amount
    }

    ProductAPI.postRes(details);

    // this.context.router.transitionTo('/advanced');
  }

});

Login.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Login;