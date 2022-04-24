import React from 'react';

export const Father = (props) => {
  return (
    <div>
      <h2>夫のお小遣いからやりくり</h2>
      <div className="money">
        <p>夫の毎月のお小遣い： {props.money_father}円</p>
      </div>
    </div>
  );
};
