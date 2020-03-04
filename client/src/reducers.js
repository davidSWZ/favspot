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

const initialStateMessages = {
  messages: [],
  isPending: false,
  error: ''
}

export const requestMessages = (state = initialStateMessages, action = {}) => {
  switch (action.type) {
    case REQUEST_MESSAGES_PENDING:
      return Object.assign({}, state, {isPending:true});
    case REQUEST_MESSAGES_SUCCESS:
      return Object.assign({}, state, {isPending:false, messages:action.payload});
    case REQUEST_MESSAGES_FAIL:
      return Object.assign({}, state, {isPending:false, error:action.payload});
    default:
      return state;
  }
}

const initialStateCard = {
  isDisplayed : true
}

export const displayCard = (state = initialStateCard, action = {}) => {
  switch (action.type) {
    case DISPLAY_CARD:
      return Object.assign({}, state, { isDisplayed: true });
    case CLOSE_CARD:
      return Object.assign({}, state, { isDisplayed : false })
    default:
      return state;
  }
}

const initialStatePosition = {
  position:{
    lat: 51.505,
    lng: -0.09
  },
  zoom: 2,
  gotLocation : false
}

export const getPosition = (state = initialStatePosition, action = {}) => {
  switch (action.type) {
    case GET_CURRENT_POSITION:
      return Object.assign({}, state, {
        position: {
          lat: action.payload.position.latitude,
          lng: action.payload.position.longitude
        },
        zoom: action.payload.zoom,
        gotLocation: true
      })
    case UPDATE_POSITION:
      return Object.assign({}, state,
        {
          position:
          {
            lat: action.payload.lat,
            lng: action.payload.lng
          }
        });
    default:
      return state;
  }
}

const initialStateNewSpot = {
  newSpot: {
    nameSpot:"",
    message:""
  }
}

export const changeValue = (state = initialStateNewSpot, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        newSpot:{
          ...state.newSpot, [action.payload.name]: action.payload.value
        }
      };
    default:
      return state;
  }
}

const initialStateSendingMessage = {
  sendingMessage: false,
  sentMessage: false
}

export const sendingMessage = (state = initialStateSendingMessage, action = {}) => {
  switch (action.type) {
    case SENDING_MESSAGE_PENDING:
      return Object.assign({}, state, { sendingMessage: true });
    case SENDING_MESSAGE_SUCCES:
      return Object.assign({}, state, { sendingMessage: false, sentMessage: true });
    default:
      return state;
  }
}
