import React, { Component } from 'react';
import axios from 'axios';

const url="http://127.0.0.1:4000/api/users"

class App extends Component {
  state={
    friends:[]
  }
  componentDidMount(){
    console.log("here")
    axios.get(url)
    .then((res)=> this.setState({friends: res.data}))
  }
  
  render() {
    return (
      <div className="App">
        <div className="friends" >
        {
          this.state.friends.map(friend => <div className="friend"> {friend.name} </div>)
        }
        </div>
      </div>
    );
  }
}

export default App;
