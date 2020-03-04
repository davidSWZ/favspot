import {
  requestMessages,
  displayCard,
  closeCard,
  updatePosition,
  getCurrentPosition,
  changeValue,
  sendingMessage
} from './actions';

export const mapStateToProps = state => {
  return {
    messages : state.requestMessages.messages,
    isPending : state.requestMessages.isPending,
    error : state.requestMessages.error,
    isDisplayed : state.displayCard.isDisplayed,
    position : state.getPosition.position,
    zoom : state.getPosition.zoom,
    gotLocation : state.getPosition.gotLocation,
    newSpot : state.changeValue.newSpot,
    sendingMessage : state.sendingMessage.sendingMessage,
    sentMessage : state.sendingMessage.sentMessage
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    onRequestMessages: () => dispatch(requestMessages()),
    displayCard: () => dispatch(displayCard()),
    closeCard: () => dispatch(closeCard()),
    getPosition: () => dispatch(getCurrentPosition()),
    updatePosition: (e) => dispatch(updatePosition(e.target.getLatLng())),
    changeValue: (e) => dispatch(changeValue(e.target)),
    sendMessage: (newMessage) => dispatch(sendingMessage(newMessage))
  }
}
