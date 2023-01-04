import './App.css';
import Boards from './components/Board';
import PropTypes from 'prop-types';
import CardList from './components/CardList';
import Card from './components/Card';
import NewBoardForm from './components/NewBoardForm';
import {useState } from 'react';
import NewCardForm from './components/NewCardForm';
import { useEffect } from 'react';
import axios from 'axios';

const boards = [{
  id:1,
  title: 'New Board',
  clicked: false,
},
{
  id:2,
  title: 'another Board',
  clicked: false
},
{
  id:3,
  title:'a Board',
  clicked:false
},
  
];

const cards = [
  {
  id:1,
  body: 'I am a card',
  likes_count: 0,
  board_id:2,
  
  },
  {
  id:2,
  body: 'I am another card',
  likes_count: 0,
  board_id:2,
    }

]
const handleCardSubmit = (data) => {
  console.log('data:',data);
}
const handleBoardSubmit = (data) => {

  // this will call the api in the future
  console.log('data: ', data);
};
const kBaseUrl = 'https://oyster-inspiration-board.herokuapp.com/';

const getAllBoardsApi = () =>{
 return axios.get(`${kBaseUrl}/boards`)
 .then(response => {
  return response.data;
 })
 .catch(err => {
  console.log(err);
 })
};

function App() {
const [boardData, setboardData] = useState([]);

useEffect( () => {
// data fetching code
getAllBoardsApi()
.then(boards => {
  console.log(boards)
})
}, []);



  const likedCard = (id) => {
    setboardData(boardData => boardData.map(board => {
      if(board.id === id) {
        return {...board, likes_count: board.likes_count + 1}
      } else {
        return board;
      }
    }));
  }
  const deleteCard = id => {
    setboardData(boardData => boardData.filter(board => {
      return board.id !== id;
    }));
  };
  const boardClick = (id) => {
    setboardData(boardData => cards.filter(card => {
      return card.board_id === id 
    }))
  };

  const showCardForm = () => {
    return <NewCardForm />;
  };

  const handleCardSubmit = (data) => {
    console.log('data:',data);
  }
  return (
    <div className="App">
      <header className="App-header">Inspiration Board</header>
      <h1>Boards</h1>
     
      <div className='boxed'>
     <Boards boards={boards} onboardClick={boardClick} onShowCardForm={showCardForm} ></Boards>
     </div>
  
      
      <h1> Selected Board</h1>
      <input type="textarea" 
          name="textValue"
         />
      <h1>Create a New Board</h1>
      <NewBoardForm handleBoardSubmit={handleBoardSubmit} ></NewBoardForm>
      
     
     
      
      <CardList cards={cards} onlikedCard={likedCard} boardData={boardData} ondeleteCard={deleteCard}/> 
       <NewCardForm handleCardSubmit={handleCardSubmit} boardData={boardData} /> 
      
      
      
    
      
    
    </div>
  );
};


export default App;






// <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
