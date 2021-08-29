import React from "react"
import { NavLink} from "react-router-dom";
const Tab = (props) => {
    const { text, elUrlNav, className} = props;
    return <NavLink className={className} activeStyle={{borderBottom: '2px solid white'}}
              to={elUrlNav}>{text}</NavLink>

}
export  default  Tab