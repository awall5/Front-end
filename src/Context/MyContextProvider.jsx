import {  useState } from "react";
import { MyContext } from "./MyContext";

const MyContextProvider = ({children}) => {
    const [count, setCount] = useState(0);
    // const [user, setUser] = useState({});

    const valueObj = {count, setCount};
    return(
        <MyContext.Provider value = {valueObj}>
            {children};
        </MyContext.Provider>
    );
};

export {MyContextProvider};