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

    var companies = [];

    // if (true){
    //     companies =
    //     (
    //     <div>
    //       <div className="col-lg-3 col-sm-3 text-center ">
    //           <a href="#/about/fedger-io"><div className='imgWrapper imgWrapperNF'><img className="img-center companyLogo" src="https://profile.getcontext.io/api/v0/company/fedger-io/img" alt=""/></div>
    //           <p>fedger.io</p></a>
    //       </div>
    //       <div className="col-lg-3 col-sm-3 text-center ">
    //           <a href="#/about/google"><div className='imgWrapper imgWrapperNF'><img className="img-center companyLogo" src="https://profile.getcontext.io/api/v0/company/google/img" alt=""/></div>
    //           <p>Google</p></a>
    //       </div>
    //       <div className="col-lg-3 col-sm-3 text-center ">
    //           <a href="#/about/facebook"><div className='imgWrapper imgWrapperNF'><img className="img-center companyLogo" src="https://profile.getcontext.io/api/v0/company/facebook/img" alt=""/></div>
    //           <p>facebook</p></a>
    //       </div>
    //       <div className="col-lg-3 col-sm-3 text-center ">
    //           <a href="#/about/giant-swarm"><div className='imgWrapper imgWrapperNF'><img className="img-center companyLogo" src="https://profile.getcontext.io/api/v0/company/giant-swarm/img" alt=""/></div>
    //           <p>Giant Swarm</p></a>
    //       </div>
    //     </div>
    //     );
              
    //     }

    if(!this.state.loginStatus) this.context.router.transitionTo('/login');

    return (


        <div className='notFound'>
            <h1 >This is not the page that you are looking for...</h1>
            <h3>
              Either it doesn't exist, or error occurred in our API. <br /> 
              If you think the problem is at our side please contact us.<br /><br />
            </h3>
            {companies}
        </div>
      );
  }
});

NotFound.contextTypes = {
  router: React.PropTypes.func
};

module.exports = NotFound;
