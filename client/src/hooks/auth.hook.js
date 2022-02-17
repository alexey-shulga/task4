import {useState, useCallback, useEffect} from "react";

const storageName = 'userData';

export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [userNAME, setUserNAME] = useState(null);
    const [userEMAIL, setUserEMAIL] = useState(null);

    const login = useCallback((jwtToken, ID, name, email) => {
        setToken(jwtToken);
        setUserID(ID);
        setUserNAME(name);
        setUserEMAIL(email);
        
        localStorage.setItem(storageName, JSON.stringify({
            userNAME: name,
            userEMAIL: email,
            userID: ID,
            token: jwtToken
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);
        setUserNAME(null);
        setUserEMAIL(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userID, data.userNAME, data.userEMAIL);
        }
    }, [ login ]);

    return { login, logout, token, userID, userNAME, userEMAIL }

}