import './App.css';
import { Component } from 'react';
import axios from 'axios';

const getConfig = {
  method: 'get',
  url: 'https://3ic8ifp6ye.execute-api.ap-southeast-2.amazonaws.com/prod/userData',
  headers: { 
    'x-api-key': '7c3df78efe644c7ba9deb7238d6f0cdf'
  }
};

let postConfig = {
  method: 'post',
  url: 'https://3ic8ifp6ye.execute-api.ap-southeast-2.amazonaws.com/prod/userData',
  headers: { 
    'x-api-key': '7c3df78efe644c7ba9deb7238d6f0cdf', 
    'Content-Type': 'application/json'
  },
};

class App extends Component{
  constructor(){
    super();
    this.state = {
      loading: true, url: null
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  setPostConfig(gitHubLink){
    var data = JSON.stringify({
      "url": gitHubLink
    });

    const postConfigGit = { ...postConfig, data: data};

    return postConfigGit;
  }
  async onSubmitForm(e) {
    e.preventDefault();
    const postConfig = this.setPostConfig(this._inputElemtent.value);

    // calling the axios post request 
    const res = await axios(postConfig).then(function (response) {
      return(JSON.stringify(response.data.url));
    }).catch(function (error) {
      console.log(error);
    });

    console.log(res);
    this._inputElemtent.value = "";
    
  }

  async componentDidMount() {
    const res = await axios(getConfig).then(function (response) {
      return(JSON.stringify(response.data.url));
    })
    this.setState(Object.assign({loading: false, url: res}));
  }
  
  render(){
    if(this.state.loading){
      return <h2>Loading ...</h2>
    }
    return (
      <div className="App">
        <br></br>
        <form onSubmit={this.onSubmitForm}>
          <input
          type="text"
          name="url"
          placeholder="Github Repo link"
          ref={myInput => (this._inputElemtent = myInput)}
          ></input>
          <button type="submit" >Save URL</button>
        </form>
        <h1>{this.state.value}</h1>
      </div>
    );
  }
}

export default App;
