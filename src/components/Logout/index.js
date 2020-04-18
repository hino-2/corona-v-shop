import { useContext, useEffect } from 'react';
import { ProductsContext } from '../ProductsContext';

const Logout = () => {
    // window.location.href = 'http://localhost:3001/logout';
    const context = useContext(ProductsContext);

    useEffect(() => {
        const doLogout = async () => {
            const responce = await fetch('/logout?_method=DELETE', {
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
                window.location.href = '/'
            }
        }
        doLogout();
    })
    
    return null;
}

export default Logout;