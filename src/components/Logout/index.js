import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { GeneralContext } from '../GeneralContext';

const Logout = () => {
    // window.location.href = 'http://localhost:3001/logout';
    const context = useContext(GeneralContext);
    const history = useHistory();

    useEffect(() => {
        const doLogout = async () => {
            const responce = await fetch('/logoutUser?_method=DELETE', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"userID": context.user.userID})
            });
            const result = await responce.json();

            console.log(result)
            if(result.result === 'success') {
                context.setUser({})
                const cookie = new Cookies();
                cookie.remove('user');
                history.push("/");
            }
        }
        doLogout();
    }, [])
    
    return null;
}

export default Logout;