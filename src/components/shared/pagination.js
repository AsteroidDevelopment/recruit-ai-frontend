import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      const {pages, currentPage, callback, totalPages} = this.props
      return <div>

            <div class="paginationLinks">
            { currentPage && currentPage > 2 ? //"2" because there's no reason to show "prev" and "first" on the second page
              <span><i class="fas fa-angle-double-left" onClick={callback} page={1}></i></span>
            : "" }

            { currentPage && currentPage > 1 ? //Only show if there IS a previous page
                <span><i class="fas fa-angle-left" onClick={callback} page={currentPage - 1} ></i></span>
              : "" }

            { pages ? pages.map(page =>
              <span onClick={callback} page={page} style={{textDecoration: currentPage==page ? 'underline' : 'none'}}>
                {page}
              </span>
            ) : "" }

            { currentPage && (currentPage < totalPages) ?
              <span><i onClick={callback} page={currentPage + 1}  class="fas fa-angle-right"></i></span>
            : "" }

            { currentPage && (currentPage+1 < totalPages) ? //Same reason as above, no reason to show on second to last page.
              <span><i class="fas fa-angle-double-right" onClick={callback} page={totalPages} ></i></span>
            : "" }
            </div>

        </div>
    }
}


export default Pagination;
