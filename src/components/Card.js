import React from "react";
import PropTypes from "prop-types";
import NewCardForm from "./NewCardForm";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="individual-card">
      <div>
        <section></section>
      </div>

      <h3 className="entry-name">{props.body}</h3>
      <section className="entry-bubble">
        <button className="num_likes"> 
          {props.likes} 🦑
        </button>
        <button className="delete_card" 
        onClick={() => props.ondeleteCard(props.card_id)}>
          Delete
        </button>
        <button onClick={() => props.onlikedCard(props.card_id)}>
          +1
        </button>
      </section>
    </div>
  );
};

{/* <NewCardForm />; */}

Card.propTypes = {
  likes: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  card_id: PropTypes.number.isRequired,
};

export default Card;
