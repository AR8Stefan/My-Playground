import React, { Component } from 'react';

import GuestList from './components/GuestList';

class App extends Component {

  state = {
    isFiltered: true,
    pendingGuest: "",
    guests: [
      {
        name: 'Stefan1',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Stefan2',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Stefan3',
        isConfirmed: false,
        isEditing: true
      }
    ]
  }
 // Will toggle confirmation 'at' the specified 'index'.
  toggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

    toggleConfirmationAt = index =>
      this.toggleGuestPropertyAt("isConfirmed", index);

    toggleEditingAt = index =>
      this.toggleGuestPropertyAt("isEditing", index);
// Sets new name when edited.
  setNameAt = (name, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange) {
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });
// Filter confirmed and unconfirmed guests.
  toggleFilter = (boolean, indexToChange) => {
    this.setState({ isFiltered: !this.state.isFiltered });
  }

  getTotalInvited = () => this.state.guests.length;
  // getAttending = () =>
  // getUnconfirmed = () =>

  render() {
    return (
       <div class="App">
      <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <form>
            <input type="text" value="Safia" placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div class="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input
              type="checkbox"
              onChange={this.toggleFilter}
              checked={this.state.isFiltered}
            /> Hide those who haven't responded
          </label>
        </div>
        <table class="counter">
          <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>

        <GuestList 
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          isFiltered={this.state.isFiltered}
        />

      </div>
    </div>
    );
  }
}

export default App;
