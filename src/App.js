import React, { Component } from 'react';
import './App.css';
import startSoundLoc from './sounds/start.wav'
import penalizeSoundLoc from './sounds/penalize.wav'
import timeoverSoundLoc from './sounds/timeover.wav'
//import checkpointSoundLoc from './sounds/checkpoint.wav' // no usado aun
import ReactCountdownClock from 'react-countdown-clock'
import firebase from './firestore'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      clockColor: '#34ebab',
      isActive: false,
      isPaused: false
    }

    this.room1Ref = firebase.firestore().collection('room1').doc('glYViwyAivdHSVtoljZN')
  }

  componentDidMount() {
    this.listenUpdater(this.room1Ref)
  }

  componentWillUnmount() {
    this.room1Ref.update({ 'start': false, 'isPenalized': false, 'isPaused': false })
  }

  listenUpdater(ref) {
    ref.onSnapshot(function(doc) {
      const startValue = doc.data().start
      const isPenalizedValue = doc.data().isPenalized
      const isPausedValue = doc.data().isPaused

      isPausedValue ? this.pause(true) : this.pause(false)

      isPenalizedValue ? this.penalize() : startValue ? this.start() : this.reset()
    }.bind(this))
  }

  myCallback() {
    let sound = new Audio(timeoverSoundLoc)
    if(this.state.isActive) sound.play()
    this.setState({time: 0, clockColor: '#34ebab', isActive: false})
    this.room1Ref.update({ 'start': false, 'isPenalized': false })
  }

  start() {
    let sound = new Audio(startSoundLoc)
    if(!this.state.isPaused) sound.play()
    this.setState({
      time: 3600,
      clockColor: '#34ebab',
      isActive: true
    })
  }

  pause(isPausedValue) {
    this.setState({ isPaused: isPausedValue })
  }

  penalize() {
    let sound = new Audio(penalizeSoundLoc)
    if(!this.state.isPaused) sound.play()
    this.setState({time: 300, clockColor: '#ff004c'})
  }

  reset() {this.setState({time: 0, clockColor: '#34ebab', isActive: false})}
  
  render() {
    const { time, isPaused, clockColor, isActive } = this.state
    const handleOnComplete = () => this.myCallback()

    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Bienvenido a Escape Room Tucumán </h1>
          <h2> {isPaused ? 'pausado' : ''} </h2>
          {isActive && <p> tiempo restante: </p>}
          <div style={{textAlign: 'left'}}>
            <ReactCountdownClock
              seconds={time}
              color={clockColor}
              alpha={0.9}
              size={200}
              paused={isPaused}
              onComplete={handleOnComplete}
            />
          </div>
        </header>
      </div>
    )
  }
}