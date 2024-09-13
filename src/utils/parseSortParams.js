import {SORTED_ORDER} from "../constants/index.js";

const parseSortParams = ({sortBy, sortOrder, sortFields}) => {
   const parsedSorOrder = SORTED_ORDER.includes(sortOrder)?sortOrder: SORTED_ORDER[0];
   const parsedSortBy = sortFields.includes(sortBy)?sortBy: "_id";
   
    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSorOrder,
    };
};

export default parseSortParams;