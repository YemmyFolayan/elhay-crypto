import React from 'react';
import Select from 'react-select';
import './selectActions.scss';
// import 'react-select/dist/react-select.css';

const options = [
  {
    value: 'Virtual Call Meeting',
    label: 'Virtual Call Meeting',
  },
  {
    value: 'Make a Payment',
    label: 'Make a Payment',
  },
  {
    value: 'Review documents',
    label: 'Review documents',
  },
  {
    value: 'Upload Documents',
    label: 'Upload Documents',
  },
  {
    value: 'Submit to Government',
    label: 'Submit to Government',
  },
  {
    value: 'Wait Action',
    label: 'Wait Action',
  },
  {
    value: 'Apply for a Visa',
    label: 'Apply for a Visa',
  },
  {
    value: 'Apply to a School',
    label: 'Apply to a School',
  },
];

export class Myselect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(value);
    // alert(value)
    //   this.setState({...actions:value})
    this.setState(prevState => ({
      actions: [...prevState.actions, value],
    }));
    console.log('');
  };

  state = {
    actions: [],
  };

  // handleBlur = () => {
  //   // this is going to call setFieldTouched and manually update touched.topcis
  //   this.props.onBlur('actions', true);
  // };

  render() {
    const remove = value => {
      this.props.delete(value);
      let filteredArray = this.state.actions.filter(
        item => item.label !== value,
      );
      this.setState({ actions: filteredArray });
    };
    return (
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="color">
          {this.props.title} Actions (select at least 1){' '}
        </label>
        <Select
          id="color"
          options={options.filter(item => !this.state.actions.includes(item))}
          multi={true}
          onChange={this.handleChange}
          // onBlur={this.handleBlur}
          value={this.state.actions.value}
        />
        <div className="selected-box">
          {this.state.actions.map((action, index) => {
            return (
              <Singleselected
                key={index}
                value={action.label}
                remove={remove}
              />
            );
          })}
        </div>

        {/* {this.state.actions.map((item, index) => {
           if (item.value.includes('Make a Payment')){
             return <p>jsdjfs</p>
           } else {
             return <p>e no dey</p>
           }
         })} */}
        {/* {!!this.props.error &&
            this.props.touched && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
            )} */}
      </div>
    );
  }
}

const Singleselected = props => {
  // const [open, setOpen] = useState(true);

  return (
    <div className={`single-selected-container`} key={props.key}>
      <div className="single-selected-inner">
        <p>
          {props.value}{' '}
          <i class="fas fa-times" onClick={() => props.remove(props.value)}></i>{' '}
        </p>
      </div>
    </div>
  );
};
