 import {
  REQUEST_MESSAGES_PENDING,
  REQUEST_MESSAGES_SUCCESS,
  REQUEST_MESSAGES_FAIL,
  DISPLAY_CARD,
  CLOSE_CARD,
  SENDING_MESSAGE_PENDING,
  SENDING_MESSAGE_SUCCES,
  GET_CURRENT_POSITION,
  UPDATE_POSITION,
  CHANGE_VALUE
 } from "./constants";

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages': 'https://myfavspots.herokuapp.com/api/v1/messages';

export const requestMessages = () => (dispatch) => {
  dispatch({ type: REQUEST_MESSAGES_PENDING });
  fetch(API_URL)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_MESSAGES_SUCCESS, payload: data }))
    .catch( error => dispatch({ type:REQUEST_MESSAGES_FAIL, payload: error }));
}

export const displayCard = () => ({
  type : DISPLAY_CARD
})

export const closeCard = () => ({
  type : CLOSE_CARD
})

export const getCurrentPosition = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition((position) => {
    dispatch({ type: GET_CURRENT_POSITION, payload: {position: position, zoom: 13, gotLocation: true}})
  }, () => {
    fetch("https://ipapi.co/json")
    .then(res => res.json())
    .then(location => {
      dispatch({ type: GET_CURRENT_POSITION, payload: {position: location, zoom: 13}})
    })
  });
}

export const updatePosition = (latLng) => ({
  type : UPDATE_POSITION,
  payload : latLng
})

export const changeValue = (target) => ({
  type : CHANGE_VALUE,
  payload : {
    name : target.name,
    value : target.value
  }
})

export const sendingMessage = (newMessage) => (dispatch) => {
  dispatch({ type : SENDING_MESSAGE_PENDING});
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: newMessage
  }).then( res => res.json())
    .then(message => {
      setTimeout( () => {
        dispatch({ type : SENDING_MESSAGE_SUCCES});
      }, 2000);
  })
}
