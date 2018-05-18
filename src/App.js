import React, { Component } from 'react';

import GuestList from './components/GuestList';
import Counter from './components/Counter';

class App extends Component {

  state = {
    isFiltered: false,
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

    removeGuestAt = index =>
      this.setState({
        guests: [
          ...this.state.guests.slice(0, index),
          ...this.state.guests.slice(index + 1)
        ]
      });
      // The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified. - MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
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
  toggleFilter = () => 
    this.setState({ isFiltered: !this.state.isFiltered });
// Handles the name submitted into the input field.  
  handleNameInput = e =>
    this.setState({ pendingGuest: e.target.value });
// Submits a new guest to the list.
  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    })
  }

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0);
  // getUnconfirmed = () => this.state.guests.length;

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    
    return (
       <div class="App">
      <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <form onSubmit={this.newGuestSubmitHandler}>
            <input 
              type="text" 
              onChange={this.handleNameInput}
              value={this.state.pendingGuest}
              placeholder="Invite Someone" />
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
        <Counter
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed} />

        <GuestList 
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          isFiltered={this.state.isFiltered}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
        />

      </div>
    </div>
    );
  }
}

export default App;
