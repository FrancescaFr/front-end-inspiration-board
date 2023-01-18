import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import NewCardForm from './NewCardForm';


const CardList = (props) => {

    // return props.cardData.map((card) => {
  
  return (
 
    props.cardData.map((card) => (
      
      <Card
        key={card.card_id}
        card_id={card.card_id}
        body={card.body}
        likes={card.likes}
        // board_id={card.board_id}
        onlikedCard={props.onlikedCard}
        ondeleteCard={props.ondeleteCard}
        onboardClick={props.onboardClick}
        handleCardSubmit={props.handleCardSubmit}
        ></Card> 
    )))};
         
  
    


CardList.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.shape({
    likes: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    // board_id: PropTypes.number.isRequired,
    card_id: PropTypes.number.isRequired,
  })),

  // ondeleteCard: PropTypes.func.isRequired,
  // onboardClick: PropTypes.func.isRequired,
  // onlikedCard: PropTypes.func.isRequired,
}
export default CardList;