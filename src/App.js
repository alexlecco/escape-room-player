import React, { Component } from 'react';
import './App.css';
import ReactCountdownClock from 'react-countdown-clock'
import firebase from './firestore'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      clockColor: "#34ebab"
    }

    this.room1Ref = firebase.firestore().collection('room1').doc('glYViwyAivdHSVtoljZN')
  }

  componentDidMount() {
    this.listenUpdater(this.room1Ref)
  }

  listenUpdater(ref) {
    ref.onSnapshot(function(doc) {
      const startValue = doc.data().start
      const penalizeValue = doc.data().penalization
      penalizeValue ? this.penalize() : startValue ? this.start() : this.reset()
    }.bind(this))
  }

  myCallback() { console.log("tiempo cumplido") } 
  start() {this.setState({time: 3600, clockColor: "#34ebab"})}
  reset() {this.setState({time: 0, clockColor: "#34ebab"})}
  penalize() {this.setState({time: 300, clockColor: "#ff004c"})}

  render() {
    const { time } = this.state
    const { clockColor } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1> Bienvenido a Escape Room Tucumán </h1>
          <h2> PLAYER </h2>
          <p> tiempo restante: </p>
          <div style={{textAlign: 'left'}}>
            <ReactCountdownClock
              seconds={time}
              color={clockColor}
              alpha={0.9}
              size={200}
              onComplete={() => this.myCallback()}
            />
          </div>
        </header>
      </div>
    )
  }
}