import React, { Component } from "react";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const VisitorInput = props => (



     <DefaultInput
         placeholder="Visitor Name"
                   value={props.visitorName}

                   onChangeText={props.onChangeText}
     />



 );
export default VisitorInput;
