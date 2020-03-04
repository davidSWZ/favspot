import React, {Component} from 'react';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps } from './reduxProps';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userIcon, otherIcon } from './icons';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import {Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Joi from 'joi';
import { schema } from './joiSchema'
// import L from "leaflet";
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.onRequestMessages();
    this.props.getPosition();
  }

  formIsValid() {
    const newSpot = {
      nameSpot : this.props.newSpot.nameSpot,
      message : this.props.newSpot.message
    }
    const result = Joi.validate(newSpot, schema);
    console.log(result);
    return !result.error && this.props.gotLocation ? true : false;
  }

  onSubmit = (e) =>  {
    e.preventDefault();

    const newMessage = JSON.stringify({
      nameSpot : this.props.newSpot.nameSpot,
      message : this.props.newSpot.message,
      latitude : this.props.position.lat,
      longitude : this.props.position.lng
    });
    console.log(newMessage)
    this.props.sendMessage(newMessage);
  }

  render() {
    const { zoom, messages, isPending, error, isDisplayed, gotLocation } = this.props;
    const position = [this.props.position.lat, this.props.position.lng];

    return (
      <div className="App">
        <Map className="map" center={position} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            gotLocation ?
            <Marker position={position} icon={userIcon} draggable={true} onDragend={this.props.updatePosition}>
            </Marker> : ''
          }
          {
            messages.map(message => (
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

        { isDisplayed ?
          <Card body className="formulaire">
            <CardTitle>myFavSpots
              <Button outline color="secondary" onClick={this.props.closeCard} className="closeBtn">X</Button>
            </CardTitle>
            <CardText>You've find a new cool spot, and you want to remember it, you've come to the right spot!</CardText>
            {!this.props.sendingMessage && !this.props.sentMessage && gotLocation ?
              <Form   onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="nameSpot">Spot</Label>
                  <Input
                    onChange={this.props.changeValue}
                    type="text"
                    name="nameSpot"
                    id="nameSpot"
                    placeholder="What's the spot?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input
                    onChange={this.props.changeValue}
                    type="textarea"
                    name="message"
                    id="message"
                    placeholder="Give a comment"
                  />
                </FormGroup>
                <Button
                  color="info"
                  type="submit"
                >Send
                </Button>
              </Form> :
              this.props.sendingMessage || !gotLocation ?
              <img alt="loading..." src="https://i.giphy.com/media/3oEjHTSuJrMnj08DpS/giphy.webp" /> :
              <CardText>Nice, You've got a new favorite spot!</CardText>
            }

          </Card> :
              <Button color="info" onClick={this.props.displayCard} className="formulaire">Add a spot</Button>
        }
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
