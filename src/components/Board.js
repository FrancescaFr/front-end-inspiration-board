import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import NewBoardForm from './NewBoardForm';
import NewCardForm from './NewCardForm';



const Boards = (props) => {


  return props.boards.map((board) => {
    
    return (
      <p> <button onClick={() => props.onboardClick(board.id)}>{board.id}.{board.title} </button></p>
      
      

    )})
};

export default Boards;