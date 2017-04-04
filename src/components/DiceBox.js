import React, { Component } from 'react';

class DiceBox extends Component {
  render() {
    console.log('dicebox component', this.props);
    return (
      <div style={{ display: 'flex', border: '1px solid black', width: '400px', height: '150px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid green', flex: 1 }}>
          <div style={{ flex: 1 }}> DICEBOX </div><button onClick={() => { this.props.rollDice(); }}>Roll</button>
          <div style={{ flex: 1 }}> SUBMIT </div><button onClick={() => {}}>Submit</button>
        </div>

        <div style={{ flexDirection: 'column', flex: 4, border: '1px solid orange', display: 'flex' }}>
          <div style={{ border: '1px solid purple', flexFlow: 'row-wrap', flex: 1, justifyContent: 'space-around' }}> actual dice </div>
        </div>
      </div>
    );
  }
}

export default DiceBox;