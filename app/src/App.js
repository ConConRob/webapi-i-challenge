import React, { Component } from "react";
import axios from "axios";

const url = "http://127.0.0.1:4000/api/users";

class App extends Component {
  state = {
    friends: [],
    inputName: "",
    inputBio: "",
    updateId: null
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

  setUpdate = friend => {
    this.setState({
      inputName: friend.name,
      inputBio: friend.bio,
      updateId: friend.id
    });
  };

  handleInputNameChange = event => {
    this.setState({ inputName: event.target.value });
  };

  handleInputBioChange = event => {
    this.setState({ inputBio: event.target.value });
  };

  addFriend = () => {
    axios
      .post(url, { name: this.state.inputName, bio: this.state.inputBio })
      .then(res => {
        this.setState(curState => ({
          friends: [...curState.friends, res.data]
        }));
      });
  };

  updateFriend = id => {
    axios
      .put(`${url}/${id}`, {
        name: this.state.inputName,
        bio: this.state.inputBio
      })
      .then(res =>
        this.setState(cS => {
          const newFriends = cS.friends.map(friend => {
            if (friend.id === id) {
              return res.data.user;
            }
            return friend;
          });
          return { friends: newFriends };
        })
      );
  };

  handleFriendSubmit = () => {
    if (this.state.updateId) {
      this.updateFriend(this.state.updateId);
    } else {
      this.addFriend();
    }
    this.setState({ inputName: "", inputBio: "", updateId: null });
  };
  render() {
    return (
      <div className="App">
        <div className="friends">
          <input
            placeholder="Name"
            onChange={this.handleInputNameChange}
            value={this.state.inputName}
          />
          <input
            placeholder="bio"
            onChange={this.handleInputBioChange}
            value={this.state.inputBio}
          />
          <button onClick={this.handleFriendSubmit}>
            {!this.state.updateId ? "Add Friend" : "Update Friend"}
          </button>
          {this.state.friends.map(friend => (
            <div key={friend.id} className="friend">
              <p>{friend.name}</p>
              <button onClick={() => this.handleDelete(friend.id)}>
                Delete
              </button>
              <button onClick={() => this.setUpdate(friend)}>Update</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
