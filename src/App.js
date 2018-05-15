import React, { Component } from 'react';

import GuestList from './components/GuestList';

class App extends Component {

  state = {
    guests: [
      {
        name: 'Stefan1',
        isConfirmed: true
      },
      {
        name: 'Stefan2',
        isConfirmed: false
      },
      {
        name: 'Stefan3',
        isConfirmed: false
      }
    ]
  }
 // will toggle confirmation 'at' the specified 'index'
  toggleConfirmationAt = indexToChange => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange) {
          return {
            ...guest,
            isConfirmed: !guest.isConfirmed
          };
        }
        return guest;
      })
    });

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
            <input type="checkbox" /> Hide those who haven't responded
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
        />

      </div>
    </div>
    );
  }
}

export default App;
