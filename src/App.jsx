import './App.css';
import react, { useState, Component } from 'react';
import axios from 'axios';

const config = {
  method: 'get',
  url: 'https://3ic8ifp6ye.execute-api.ap-southeast-2.amazonaws.com/prod/userData',
  headers: { 
    'x-api-key': '7c3df78efe644c7ba9deb7238d6f0cdf'
  }
};

class App extends Component{
  state = {loading: true, url: null}
  setUrl(goturl){
    this.setState((url) => ({url: goturl}));
  }
  async componentDidMount() {
    const res = await axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      return(JSON.stringify(response.data.url));
    })
    console.log(res);
    this.setState(Object.assign({loading: false, url: res}));
  }
  
  render(){
    if(this.state.loading){
      return <h2>Loading ...</h2>
    }
    const {url} = this.state;
    return (
      <div className="App">
        <br></br>
        <form>
          <input
          type="text"
          name="url"
          placeholder="Github Repo link"
          ></input>
          <button type="submit">Save URL</button>
        </form>
      </div>
    );
  }
}

export default App;
