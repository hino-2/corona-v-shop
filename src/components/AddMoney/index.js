import React          from 'react';
import Button         from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './style.scss';

const useStyles = makeStyles({
    root: {
      background: '#df641a',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 50,
      width: '100%',
      lineHeight: 'normal',
      padding: '0 20px',
      minWidth: '100px',
      marginTop: '10px',
      "&:hover": {
        backgroundColor: "#cc9a00",
      }
    }
});

const AddMoney = () => {
    const classes = useStyles();

    return (
        <div className="addmoney-container">
            <div className="card-info">
            <div>
                    <div className="form__group field">
                        <input type="input" 
                               className="form__field" 
                               placeholder="Номер карты" 
                               id="card-num" 
                               autoComplete="false" 
                               required />
                        <label htmlFor="card-num" className="form__label">Номер карты</label>
                    </div>
                </div>
                <div>
                    <div className="form__group field">
                        <input type="input" 
                               className="form__field" 
                               placeholder="ММ/ГГ" 
                               id="card-date" 
                               autoComplete="false" 
                               required />
                        <label htmlFor="card-date" className="form__label">ММ/ГГ</label>
                    </div>
                </div>
                <div>
                    <div className="form__group field">
                        <input type="input" 
                               className="form__field" 
                               placeholder="CVC" 
                               id="card-cvc" 
                               autoComplete="false" 
                               required />
                        <label htmlFor="card-cvc" className="form__label">CVC</label>
                    </div>
                </div>
            </div>
            <div>
                <div className="form__group field">
                    <input type="input" 
                            className="form__field" 
                            style={{fontSize: "62px"}}
                            placeholder="Сумма" 
                            id="summa" 
                            autoComplete="false" 
                            required />
                    <label htmlFor="summa" className="form__label-sum">Сумма</label>
                </div>
            </div>
            <Button
                classes={{
                    root: classes.root,
                    label: classes.label,
                }}>
                ПОПОЛНИТЬ
            </Button>
        </div>
    );
}

export default AddMoney;