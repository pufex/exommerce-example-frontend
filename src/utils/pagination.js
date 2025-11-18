const pagination = (currentPage, pagesCount, pagesCutCount) => {
    const leftPages = Math.floor(pagesCutCount/2)
    const rightPages = Math.ceil(pagesCutCount/2)
    let start, end;

    if(pagesCount <= pagesCutCount){
        start = 1 
        end = pagesCount
    }else if (currentPage - leftPages <= 0){
        start = 1
        end = pagesCutCount
    }else if (currentPage + rightPages > pagesCount){
        start = pagesCount - leftPages - rightPages + 1
        end = pagesCount
    }else{
        start = currentPage - leftPages
        end = currentPage + rightPages - 1
    }

    const paginationArray = new Array(end - start + 1)
    for(let i = 0; i < paginationArray.length; i++){
        paginationArray[i] = start + i
    }
    return paginationArray
}

export default pagination