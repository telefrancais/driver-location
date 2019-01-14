import React from 'react';

const Square = (props) => (
    <div className={props.stop === 'false' ? 'square__blank' : 'square__stop'}>
        
    </div>
);

export default Square;