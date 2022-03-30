import './App.css';
import { useState, useEffect } from "react";
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

const App = () => {
  const [url, setUrl] = useState("");

  function setPostConfig(gitHubLink){
    var data = JSON.stringify({
      "url": gitHubLink
    });

    const postConfigGit = { ...postConfig, data: data};

    return postConfigGit;
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    const postConfig = setPostConfig(url);

    // calling post to update endpoint. 
    const res = await axios(postConfig).then(function (response) {
      return response.data.url;
    }).catch(function (error) {
      console.log(error);
    });
    setUrl(res);
  }

  useEffect(() => {
    getUrl();
  }, []);

  async function getUrl() {
    // calling get before display of component
    const res = await axios(getConfig).then(function (response) {
      return response.data.url;
    }).catch(function (error) {
      console.log(error);
    });
    setUrl(res)    
  }
    return (
      <div className="App">
        <br></br>
        <form onSubmit={onSubmitForm}>
          <input
          type="text"
          name="url"
          placeholder="Github Repo link"
          value={url}
          onChange={myInput => setUrl(myInput.target.value)}
          ></input>
          <button type="submit" >Save URL</button>
        </form>
      </div>
    );
};

export default App;