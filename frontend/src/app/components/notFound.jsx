let React = require('react');
let mui = require('material-ui');
let DataStore = require('../stores/dataStore');

let {
  TextField, Paper, RaisedButton
} = mui;

let NotFound = React.createClass({

  getInitialState: function () {
    return { 
      objectLength : 5
    }
  },

  render() {

    if(!this.state.loginStatus) this.context.router.transitionTo('/login');

    return (


        <div className='notFound'>
            <h1 >This is not the page that you are looking for...</h1>
            <h3>
              Either it doesn't exist, or error occurred in our API. <br /> 
              If you think the problem is at our side please contact us.<br /><br />
            </h3>
        </div>
      );
  }
});

NotFound.contextTypes = {
  router: React.PropTypes.func
};

module.exports = NotFound;
