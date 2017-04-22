import React, { Component } from 'react';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import bangYellow from '../assets/media/bang_yellow.png';
import energyYellow from '../assets/media/energy.png';
import healthYellow from '../assets/media/heart_yellow.png';
import powerSVG from '../assets/media/power-svg.svg';
//import '../assets/dicebox.css';
import '../assets/Game.css'

class DiceBox extends Component {

  showIcon(val) {
    if (val === 'health') {
      return <img className="dice-face-image" src={healthYellow} />;
    }
    if (val === 'energy') {
      return <img className="dice-face-image" src={energyYellow} />;
    }
    if (val === 'attack') {
      return <img className="dice-face-image" src={bangYellow} />;
    }
    return val;
  }

  showSubmit() {
    const rolled = this.props.diceBox.one.val;
    const roller_uid = this.props.auth.uid;
    const roller = this.props.game.players[roller_uid];

    return (rolled !== '?' && this.props.auth.uid === this.props.game.chosenOne.uid) ?
      <div style={{borderStyle: 'solid', borderColor: 'DarkBlue'}}>
        <div style={{borderStyle: 'solid', borderColor: 'darkorange'}} onClick={this.props.game.submitted ? null : () => { this.props.submitRoll(roller); }}>{this.props.game.submitted ? ' SUBMITTED' : 'SUBMIT'}</div>
      </div>
              : <div style={{borderStyle: 'solid', borderColor: 'darkseagreen'}} />;
  }

  showRollCount() {
    const roller_uid = this.props.auth.uid;
    const roller = this.props.game.players[roller_uid];

    return !(this.props.game.chosenOne && this.props.game.chosenOne.uid === this.props.auth.uid && this.props.game.submitted && !this.props.game.kingAttackedOnTurn) &&
            (<div className="dice-roll-button"
              onClick={() => { this.props.rollDice(this.props.auth.uid, this.props.game.chosenOne.uid, roller); }} >
              <div style={{ textAlign: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>{this.props.game.rollCount}</div>
              <div style={{ textAlign: 'center', color: 'white', fontSize: '16px' }} >ROLL</div>
            </div>);
  }

  endYourTurn() {
    return <button style={{ backgroundColor: 'red', border: '1px solid red', borderRadius: '8px', color: 'white', fontSize: '16px', width: '70px', height: '60px', boxShadow: 'grey -1px 3px 10px' }} onClick={() => { this.props.endTurn(); }}> END TURN</button>;
  }


  render() {
    const rolled = this.props.diceBox.one.val;

    let { diceBox, submitted, kingAttackedOnTurn, chosenOne } = this.props.game
    let rowOne = {one: diceBox.one, two: diceBox.two, three: diceBox.three}
    let rowTwo = {four: diceBox.four, five: diceBox.five, six: diceBox.six }

    return (

      <div className="dice-box">
        <div className="dice-buttons">

          {!submitted && this.showRollCount()}
          {!submitted && this.showSubmit()}
          {submitted && !kingAttackedOnTurn && (this.props.auth.uid === chosenOne.uid) && this.endYourTurn()}

        </div>

        <div className="dice-faces">
          <div className="dice-row">
            {map(rowOne, (dice, key) =>
              <div
                className={dice.selected ? 'dice-toggled' : 'dice'}
                onClick={() => this.props.selectDice(key, this.props.auth.uid, chosenOne.uid)}
                key={key}
              > 
                {this.showIcon(dice.val)}
              </div>
            )}
          </div>
          <div className="dice-row">
              {map(rowTwo, (dice, key) =>
                <div
                  className={dice.selected ? 'dice-toggled' : 'dice'}
                  onClick={() => this.props.selectDice(key, this.props.auth.uid, chosenOne.uid)}
                  key={key}
                > 
                  {this.showIcon(dice.val)}
                </div>
              )}
            </div>
        </div>
      </div>
    );
  }
}




export default DiceBox;
