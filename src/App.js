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

const boards = [
  {
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
  card_id:1,
  body: 'I am a card',
  likes: 0,
  board_id:3,
  
  },
  {
  card_id:2,
  body: 'I am another card',
  likes: 0,
  board_id:2,
    }

]


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

const getAllCardsApi = () =>{
  return axios.get(`${kBaseUrl}/cards`)
  .then(response => {
   return response.data;
  })
  .catch(err => {
   console.log(err);
  })
 };

const addNewBoardApi = (title) => {
  const currentData = {title,}
  return axios.post(`${kBaseUrl}/boards`, currentData)
  .then(response => {
    return response.data;
  })
  .catch(err => {
    console.log(err);
  })
}

const addNewCardApi = (body) => {
  const currentData = {body,
  likes: 0,
  board_id:3
}
  return axios.post(`${kBaseUrl}/cards`, currentData)
  .then(response => {
    return response.data;
  })
  .catch(err => {
    console.log(err);
  })
}
function App() {
const [boardData, setboardData] = useState([]);


const getAllBoards = () => {
  getAllBoardsApi()
  .then(boards => {
    setboardData(boards)
  })
};

const getAllCards = () => {
  getAllCardsApi()
  .then(cards => {
    setboardData(cards)
  })
};

useEffect( () => {
// data fetching code

getAllBoards();


}, []);


  const likedCard = (card_id) => {
    setboardData(boardData => boardData.map(board => {
      if(board.id === card_id) {
        return {...board, likes: board.likes + 1}
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
  const boardClick = (board_id) => {
    getAllCardsApi()
    .then(cards => {
     
       console.log(cards)
  })
  };
   


  //   setboardData(boardData => cards.map(cards => {
  //     if(cards.board_id === board_id) {
  //       return {cards}
  //     } else {
  //       return cards
  //     }
  //   return getAllCards(board_id)
  //   .then(cardResult => {
  //   setboardData(boardData => boardData.map(card => {
  //       if( card.board_id === cardResult.board.id){
  //         return cardResult;
  //       } else {
  //         return card;
  //       }
      
  //   }));
  // }
  // }
    // setboardData(boardData => cards.filter(card => {
    //   return card.board_id === board_id 
    // }))
  

   const handleBoardSubmit = (data) => {
  addNewBoardApi(data)
  .then(newBoard => {
    setboardData([...boardData, newBoard])
    console.log('here')

  })
  .catch(e => console.log(e));
};

  const handleCardSubmit = (data) => {
    addNewCardApi(data)
    .then(newCard => {
      setboardData([...boardData,newCard])
    })
    .catch(e => console.log(e))
  }
  return (
    <div className="App">
      <header className="App-header">Inspiration Board</header>
      <h1>Boards</h1>
     
      <div className='boxed'>
     <Boards boardData={boardData} handleBoardSubmit={handleBoardSubmit} onboardClick={boardClick}  ></Boards>
     </div>
  
      
    
      <h1>Create a New Board</h1>
      <NewBoardForm handleBoardSubmit={handleBoardSubmit} ></NewBoardForm>
      
         
{/* <CardList  onlikedCard={likedCard} cardData={boardData} ondeleteCard={deleteCard} handleCardSubmit={handleCardSubmit}/>  */}
      
      <NewCardForm handleCardSubmit={handleCardSubmit}  /> 

      
      
    
    </div>
  )}







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
