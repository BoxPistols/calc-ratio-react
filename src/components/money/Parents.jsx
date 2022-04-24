import React from 'react';
import { Child } from './Child';
import { Father } from './Father';

export const Parents = () => {
  const money_f = 30000;
  const money_c = 5000;

  const money_calc = (x, y) => {
    return x - y;
  };

  return (
    <div>
      <hr />
      <section>
        <Child money_child={money_c} />
      </section>
      <section>
        <Father money_father={money_f} />
      </section>
      <section>
        <h2>夫のお小遣いから引いた結果</h2>
        <p>今月の夫のお小遣い： {money_calc(money_f, money_c)}円</p>
      </section>
    </div>
  );
};
