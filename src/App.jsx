import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{
  render(){
    return (
      <div className="App">
        <br></br>
        <form>
          <input
          type="text"
          name="url"
          placeholder="Github Repo link"
          />
          <button type="submit">Save URL</button>
        </form>
      </div>
    );
  }
}

export default App;
