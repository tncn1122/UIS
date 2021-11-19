export const paginateResult = (total, currPage, pagesSize, data) => {
    return {
        total: total,
        nextPage: (total/pagesSize) > currPage ? currPage + 1 : null,
        prevPage: currPage > 1 ? currPage - 1 : null,
        currPage: currPage,
        results: data
    }
}