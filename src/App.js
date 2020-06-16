import React, { Component } from 'react';
import './App.css';
import startSoundLoc from './sounds/start.wav'
import penalizeSoundLoc from './sounds/penalize.wav'
import timeoverSoundLoc from './sounds/timeover.wav'
import checkpointSoundLoc from './sounds/checkpoint.wav' // no usado aun
import ReactCountdownClock from 'react-countdown-clock'
import firebase from './firestore'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      clockColor: '#34ebab',
      isActive: false
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

  myCallback() {
    let sound = new Audio(timeoverSoundLoc)
    if(this.state.isActive) sound.play()
    this.setState({time: 0, clockColor: '#34ebab'})
    this.room1Ref.update({ "start": false, "penalization": false })
  }

  start() {
    let sound = new Audio(startSoundLoc)
    sound.play()
    this.setState({
      time: 3600,
      clockColor: '#34ebab',
      isActive: true
    })
  }

  penalize() {
    let sound = new Audio(penalizeSoundLoc)
    sound.play()
    this.setState({time: 300, clockColor: '#ff004c'})
  }

  reset() {this.setState({time: 0, clockColor: '#34ebab'})}
  
  render() {
    const { time } = this.state
    const { clockColor } = this.state
    const handleOnComplete = () => this.myCallback()

    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Bienvenido a Escape Room Tucumán </h1>
          <h2> PLAYER </h2>
          <p> tiempo restante: </p>
          <div style={{textAlign: 'left'}}>
            <ReactCountdownClock
              seconds={time}
              color={clockColor}
              alpha={0.9}
              size={200}
              onComplete={handleOnComplete}
            />
          </div>
        </header>
      </div>
    )
  }
}