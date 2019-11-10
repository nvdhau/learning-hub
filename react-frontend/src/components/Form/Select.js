import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: '100%'
  },
  selectEmpty: {
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const { data } = props
  const [selectValue, setValue] = React.useState('');
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setValue(event.target.value);
  };
  
  return (
    <React.Fragment>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel 
          ref={inputLabel} 
          id={['simpleselectoutlined', props.id].join('-')}
          required={props.required ? true : false}
          >
          {props.label}
        </InputLabel>
        <Select
          labelId={['simpleselectoutlinedselect', props.id].join('-')}
          id={props.id}
          name={props.name}
          value={selectValue}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {
                data.map(
                    (item) => 
                    <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>    
                )
            }
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
