const parseInteger =(value, defaultValue)=>{

    if(typeof value !== "string") {
         return defaultValue;
    };

    const parsedInteger = parseInt(value);
    
    if(Number.isNaN(parseInt(parsedInteger))){
           return defaultValue;
    };

    return parsedInteger;
};

const parsePaginationParams =({perPage, page})=>{
    const parsedPerPage = parseInteger(perPage, 10);
    const parsedPage = parseInteger(page, 1);
    return {
        perPage: parsedPerPage,
        page: parsedPage,
    };

};

export default parsePaginationParams;

