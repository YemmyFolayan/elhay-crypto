import React from 'react';
import { handleShuttlers, shuttlersCode } from 'appRedux/actions/domore';
import { Platformbutton } from 'components/common/button/button';
import { Newprompt } from 'components/common/prompt/prompt';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { useDispatch } from 'react-redux';
import bus from 'assets/shuttlersprompt.svg';
import { shuttleProcess } from 'helpers/data';
import { Numberedcheck } from 'components/common/listcheck/listcheck';
import { Clipboard } from 'components/common/clipboard/clipboard';
import { connect } from 'react-redux';

const Shuttlersprompt = props => {
  var dispatch = useDispatch();
  return (
    <Newprompt img={bus}>
      <Titlesubtitle
        title="NetWebPay X Shuttlers"
        subtitle="Here’s how to get 50% off your first Shuttlers ride using the vesti App Promo Code in 3 simple steps"
      />
      {shuttleProcess.map((item, index) => (
        <Numberedcheck index={index + 1} body={item} type="inner" />
      ))}

      <Clipboard
        title={``}
        link={'vesti'}
        click={() => props.shuttlersCode()}
      />
      <div className="mb-4"></div>
      <Platformbutton
        name="Done"
        type="normal"
        click={() => dispatch(handleShuttlers(false))}
      />
    </Newprompt>
  );
};

const mapStateToProps = ({ domore }) => {
  const { loading } = domore;
  return {
    loading,
  };
};

const mapDispatchToProps = {
  shuttlersCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shuttlersprompt);
