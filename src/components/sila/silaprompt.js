import React from 'react';
import digitalbank from 'assets/digitalbank.svg';
// import { Listcheck } from "components/common/listcheck/listcheck";
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import './silaprompt.scss';
import { Newprompt } from 'components/common/prompt/prompt';

export const Silaprompt = props => {
  // var data = ['Valid passport (International or local).','Valid Driver’s License.','Valid National Identity Card.','Valid Voters card.']
  return (
    <Newprompt img={digitalbank}>
      <Titlesubtitle
        title="Want to Bank Digitally ?"
        subtitle="Bank easily with us without having a physical USA bank account,
                we know how hard it is to get a bank account as a migrant."
      />
      {/* <Listcheck data={data}/> */}

      <div className="silaprompt__inner__bottom__btn">
        <button className="" onClick={() => props.move(1)}>
          Yes, I Want In
        </button>
        <button className="">No, I Don't Want In</button>
      </div>
    </Newprompt>
    // <section className="silaprompt">
    //     <div className="silaprompt__inner">
    //         <img className="digitalbank" src={digitalbank} alt="digital bank svg"/>
    //         <div className="silaprompt__inner__bottom">

    //         </div>

    //     </div>

    // </section>
  );
};
