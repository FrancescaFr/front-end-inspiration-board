import './App.css';
import Boards from './components/Board';
import PropTypes from 'prop-types';
import CardList from './components/CardList';
import BoardList from './components/BoardList';
import Card from './components/Card';
import NewBoardForm from './components/NewBoardForm';
import {useState } from 'react';
import NewCardForm from './components/NewCardForm';
import { useEffect } from 'react';
import axios from 'axios';



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

const getAllCardsApi = (board_id) => {
  return axios.get(`${kBaseUrl}/boards/${board_id}/cards`)
  .then(response => {
    console.log(response.data.board_id)
   return response.data;
  })
  .catch(err => {
   console.log(err);
  })
 };



const addNewBoardApi = (title) => {
  const currentData = {title}
  return axios.post(`${kBaseUrl}/boards`, currentData)
  .then(response => {
    return response.data;
  })
  .catch(err => {
    console.log(err);
  })
}

const addNewCardApi = (body, currentBoard) => {
  const currentData = {body,
  likes:0,
board_id: 2}
  

  return axios.post(`${kBaseUrl}/cards`, currentData)
  .then(response => {
   
    return response.data;
    
  })
  .catch(err => {
    console.log(err);
  })
}

const likeCardApi = (card_id) => {

  return axios.patch(`${kBaseUrl}cards/${card_id}/like`)
  .then(response => {
    return response.data;
  })
  .catch(err => {
    console.log(err)
  });
}

  const deleteCardApi = (card_id) => {
    return axios.delete(`${kBaseUrl}/cards/${card_id}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err)
    });
    }
  

function App() {
const [boardData, setboardData] = useState([]);
const [cardData, setCardData] = useState([]);
const [currentBoard, setCurrentBoard] = useState([]);
// const [handlelike, sethandleLike] = useState(0)




const getAllBoards = () => {
   getAllBoardsApi()
  .then(boards => {
    setboardData(boards)
  })
};

const getAllCards = () => {
  getAllCardsApi()
  .then(cards => {
    setCardData(cards)
  })
};

useEffect( () => {
// data fetching code

getAllBoards();


}, [boardData]);


const likedCard = (card_id) => {
 return likeCardApi(card_id)
 .then (likeResult => {
  setCardData(cardData => cardData.map(card => {
    if (card.card_id === likeResult.card_id) {
      return likeResult
    }else {
      return card
    }
 }))
})
}
        

  


  const deleteCard = card_id => {
    deleteCardApi(card_id)
    setCardData(cardData => cardData.filter(card => {
      return card.card_id !== card_id;
    }));
  };

  const handleCardSubmit = (newCardMessage,currentBoard) => {
   
    addNewCardApi(newCardMessage, currentBoard)

    .then(newCard => {
       setCardData([...cardData, newCard])
    
       console.log(cardData)
     
      
    
    
  
    })
    .catch(e => console.log(e));
  };
  const boardClick = (board_id) => {
 
    getAllCardsApi(board_id)
    .then(board => {
       setCardData(board.cards)
      //  console.log(cardData)
      //  console.log([boardData])
      //  setboardId(board_id)
       
       
       
  } )
 
  };

   const handleBoardSubmit = (data) => {
    addNewBoardApi(data)
  .then(newBoard => {
    setboardData([...boardData, newBoard])
  

  })
  .catch(e => console.log(e));
};


  return (
    <div className="App">
      <header className="App-header">Inspiration Board</header>
      <h1>Boards</h1>
     
      <div className='boxed'>
     <BoardList boardData={boardData} handleBoardSubmit={handleBoardSubmit} onboardClick={boardClick} handleCardSubmit={handleCardSubmit} ></BoardList>
     </div>
  
      
    
      <h1>Create a New Board</h1>
      <NewBoardForm handleBoardSubmit={handleBoardSubmit} ></NewBoardForm>
      
         
<CardList  onlikedCard={likedCard} cardData={cardData} ondeleteCard={deleteCard} handleCardSubmit={handleCardSubmit}/> 
      
          <NewCardForm handleCardSubmit={handleCardSubmit} currentBoard={currentBoard} />   

      
      
    
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
