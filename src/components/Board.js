import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import NewBoardForm from './NewBoardForm';
import NewCardForm from './NewCardForm';
import CardList from './CardList';



const Boards = (props) => {


  return props.boardData.map((board) => {
 
    return (
      
      <p><button onClick={() => props.onboardClick(board.board_id)}>{board.board_id}.{board.title}  </button></p>
  


    )})
};

export default Boards;