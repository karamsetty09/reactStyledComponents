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
    console.log(e.target.value);
    setUrl("");
    // pass the correct vlaue to below line.
    const postConfig = setPostConfig();

    // calling the axios post request 
    const res = await axios(postConfig).then(function (response) {
      return(JSON.stringify(response.data.url));
    }).catch(function (error) {
      console.log(error);
    });

    console.log(res);
    
  }

  useEffect(() => {
    getUrl();
  }, []);

  async function getUrl() {
    const res = await axios(getConfig).then(function (response) {
      return(JSON.stringify(response.data.url));
    })
    console.log(res);
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