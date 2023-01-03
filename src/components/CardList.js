import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import NewCardForm from './NewCardForm';


const CardList = (props) => {
  return props.boardData.map((board) => {
   
    return (
     
      <Card
        key={board.id}
        id={board.id}
        body={board.body}
        likes_count={board.likes_count}
        board_id={board.board_id}
        onlikedCard={props.onlikedCard}
        ondeleteCard={props.ondeleteCard}
        onboardClick={props.onboardClick}
        onShowCardFrom={props.onShowCardFrom}
        
        ></Card>
        

    )})
    
};

export default CardList;