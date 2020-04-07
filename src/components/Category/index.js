import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './style.scss';

const useStyles = makeStyles({
    root: {
      fontFamily: 'Montserrat, sans-serif',
      background: 'linear-gradient(270deg, #BA6400 0%, #BE2E00 100%);',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      width: '100%',
      lineHeight: 'normal',
      padding: '0 20px',
      minWidth: '100px'
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
});

const Category = ({ name }) => {
    const classes = useStyles();
    // console.log(name);
    

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