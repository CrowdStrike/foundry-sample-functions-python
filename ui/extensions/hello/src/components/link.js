import React, { useContext } from "react";
import {  Link as ReactRouterLink } from "react-router-dom";
import { FalconApiContext } from "../contexts/falcon-api-context.js";

function Link({ children, useFalconNavigation = false, to }) {
  const { navigation } = useContext(FalconApiContext);

  if (useFalconNavigation) {
    return (
      <a onClick={navigation.onClick} href={to}>{children}</a>
    )
  }

  return <ReactRouterLink to={to}>{children}</ReactRouterLink>
   
}

export { Link };
