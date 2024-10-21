import * as React from "react";
const loadFloatingLabelInput =()=> React.lazy(() => import('./Privates/forms/FloatingLabelInput'));
export const FormElements = {
 getFloatingLabelInput: loadFloatingLabelInput,
};