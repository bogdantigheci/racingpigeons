import React from 'react';
import Card from './card';

const CardBlock = (props) => {
  const renderCards = () => {
    return props.list
      ? props.list.map((card, i) => {
          return (
            <div key={i}>
              <Card key={i} {...card} />
            </div>
          );
        })
      : null;
  };

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
