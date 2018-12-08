import React from "react";
import { authenticated } from "../../utils/utils";
import { Redirect, Route } from "react-router-dom";
import { withCookies } from "react-cookie";

const UnauthenticatedRoute = ({component: Component, appProps: P, ...rest}) => {
   const cookies = P.cookies;

   var isAuthenticated = false;
   if (cookies) {
      isAuthenticated = authenticated(cookies.get("userId"), 
                                         cookies.get("token"));
   }

   return (
      <Route
         {...rest}
         render={props =>
            isAuthenticated ? (
               <Redirect to={{pathname: '/portfolio', 
                  state: { from: props.location}}} />
            ) : (
               <Component {...props} />
            )
         }
      />
   )
};

export default withCookies(UnauthenticatedRoute);
