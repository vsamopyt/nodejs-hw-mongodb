const calculatePaginationData = (perPage, page, count)=>{
    const totalPages = Math.ceil(count/perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page !==1;
    return {
        totalPages,
        hasNextPage,
        hasPreviousPage
    };
};

export default calculatePaginationData;
