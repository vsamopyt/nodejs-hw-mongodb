
import {typeList} from "../../constants/contacts.js";

export const parseType = (value, array) =>{
    if(typeof value !== "string") {
        return;
    }
    if(!array.includes(value)){
        return;
    }
    return value; 
};

export const parseBoolean =(value)=> {
    if (typeof value !== "string") {return;};
    console.log("value1", value);
    
    if(!["true", "false"].includes(value)){
        return;
    };

    return value === "true" ;
};


const parseContactsFilterParams =({type, isFavourite}) =>{

    const parsedType = parseType(type,typeList);
    const parsedIsFavourite = parseBoolean(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite
    };
}; 

export default parseContactsFilterParams;