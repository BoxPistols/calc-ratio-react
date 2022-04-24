import React from 'react';

export const Child = (props) => {
  return (
    <div>
      <h2>お母さん、お小遣いください</h2>
      <div className="money">
        <p>あげる金額は： {props.money_child}円</p>
      </div>
    </div>
  );
};
