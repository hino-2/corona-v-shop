import React          from 'react';
import Button         from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      fontFamily: 'Montserrat, sans-serif',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      width: '100%',
      lineHeight: 'normal',
      padding: '0 20px',
      minWidth: '100px'
    },
    label: {
      textTransform: 'capitalize',
    },
});

const Category = ({ name }) => {
    const classes = useStyles();

    return(
        <Button classes={{
            root: classes.root,
            label: classes.label,
        }}>
            { name }
        </Button>
    );
}

export default Category;