import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import NewBoardForm from './NewBoardForm';
import NewCardForm from './NewCardForm';
import CardList from './CardList';



const Boards = (props) => {
  return (
 
    
      
      <p><button onClick={() => props.onboardClick(props.board_id)}>{props.board_id}.{props.title}  </button></p>
   
   


    )};

Boards.propTypes = {
  title: PropTypes.string.isRequired,
 
}
export default Boards;