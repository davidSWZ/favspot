import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';

import logobleu from './images/logo bleu.png';
import logorouge from './images/logo rouge.png';


import { Card, Button, CardTitle, CardText } from 'reactstrap';
import {Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import Joi from 'joi';

import L from "leaflet";
import './App.css';

var userIcon = L.icon({
  iconUrl: logobleu,
  iconSize: [36, 41],
  iconAnchor: [18, 41],
  popupAnchor: [0, -41],
});

var otherIcon = L.icon({
  iconUrl: logorouge,
  iconSize: [36, 41],
  iconAnchor: [18, 41],
  popupAnchor: [0, -41],
});

const schema = Joi.object({
    nameSpot: Joi.string()
        .min(1)
        .max(100)
        .required(),
    message: Joi.string()
        .min(1)
        .max(500)
        .required(),
})

const API_URL = window.location.hostname == 'localhost' ? 'http://localhost:5000/api/v1/messages': 'https://myfavspots.herokuapp.com/api/v1/messages';

class App extends Component {

  state = {
    position:{
      lat: 51.505,
      lng: -0.09
    },
    zoom: 2,
    gotUserLocation:false,
    newSpot:{
      nameSpot:"",
      message:""
    },
    sendingMessage: false,
    sentMessage: false,
    messages: []
  };

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then( messages =>{
        this.setState({
          messages
        })
      })

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        position:{
          lat : position.coords.latitude,
          lng : position.coords.longitude
        },
        gotUserLocation:true,
        zoom:13
      })
    }, () => {
      fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(location => {
        this.setState({
        position:{
          lat : location.latitude,
          lng : location.longitude
        },
        gotUserLocation:true,
        zoom:13
        })
      })
    })
  }

formIsValid() {
  const newSpot = {
    nameSpot : this.state.newSpot.nameSpot,
    message : this.state.newSpot.message
  }

  const result = Joi.validate(newSpot, schema);

  return !result.error && this.state.gotUserLocation ? true : false;
}

  onSubmit = (e) =>  {
    e.preventDefault();
    this.setState({
      sendingMessage: true
    })
    if(this.formIsValid()) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({
          nameSpot : this.state.newSpot.nameSpot,
          message : this.state.newSpot.message,
          latitude : this.state.position.lat,
          longitude : this.state.position.lng
        })
      }).then( res => res.json())
        .then(message => {
          console.log(message)
          setTimeout( () => {
            this.setState({
              sendingMessage: false,
              sentMessage: true
            })
          }, 2000);
        })
    }
  }

  changeValue = (e) => {
     const {name, value} = e.target;
     this.setState(prevState => ({
       newSpot:{
         ...prevState.newSpot,
         [name] :value
       }
     }))
  }

  render() {
    const position = [this.state.position.lat, this.state.position.lng];

    return (
      <div className="App">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            this.state.gotUserLocation ?
            <Marker position={position} icon={userIcon}>
            </Marker> : ''
          }
          {
            this.state.messages.map(message => (
              <Marker
                key={message._id}
                position={[message.latitude, message.longitude] }
                icon={otherIcon}>
                <Popup>
                  <em>{message.nameSpot}</em> : {message.message}
                </Popup>
              </Marker> : ''
            ))
          }
          }
        </Map>
        <Card body className="formulaire">
          <CardTitle>myFavSpots</CardTitle>
          <CardText>You've find a new cool spot, and you want to remember it, you've come to the right spot!</CardText>
          {!this.state.sendingMessage && !this.state.sentMessage && this.state.gotUserLocation ?
            <Form   onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="nameSpot">Spot</Label>
                <Input
                  onChange={this.changeValue}
                  type="text"
                  name="nameSpot"
                  id="nameSpot"
                  placeholder="What's the spot?"
                />
              </FormGroup>
              <FormGroup>
                <Label for="message">Message</Label>
                <Input
                  onChange={this.changeValue}
                  type="textarea"
                  name="message"
                  id="message"
                  placeholder="Give a comment"
                />
              </FormGroup>
              <Button
                color="info"
                type="submit"
                disabled={!this.formIsValid()}
              >Send
              </Button>
            </Form> :
            this.state.sendingMessage || !this.state.gotUserLocation ?
            <img alt="loading..." src="https://i.giphy.com/media/3oEjHTSuJrMnj08DpS/giphy.webp" /> :
            <CardText>Nice, You've got a new favorite spot!</CardText>
          }

        </Card>
      </div>
    )
  }
}
export default App;


//3'31'00 du tuto
// deploy with heroku
// penser au database url une fois sur heroku
