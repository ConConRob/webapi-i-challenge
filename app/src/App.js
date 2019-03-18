import React, { Component } from "react";
import axios from "axios";

const url = "http://127.0.0.1:4000/api/users";

class App extends Component {
  state = {
    friends: []
  };
  componentDidMount() {
    axios.get(url).then(res => this.setState({ friends: res.data }));
  }

  handleDelete = id => {
    axios.delete(`${url}/${id}`).then(() => {
      this.setState(curState => {
        const newFriends = curState.friends.filter(friend => friend.id !== id);
        return {
          friends: newFriends
        };
      });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="friends">
          {this.state.friends.map(friend => (
            <div key={friend.id} className="friend">
              <p>{friend.name}</p>
              <button onClick={()=>this.handleDelete(friend.id)} >Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
