import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import NewCardForm from './NewCardForm';


const CardList = (props) => {
  return props.cardData.map((card) => {
  
    return (
     
      <Card
        key={card.id}
        card_id={card.id}
        body={card.body}
        likes={card.likes}
        board_id={card.board_id}
        onlikedCard={props.onlikedCard}
        ondeleteCard={props.ondeleteCard}
        onboardClick={props.onboardClick}
    
        
        ></Card>
        

    )})
    
};

export default CardList;