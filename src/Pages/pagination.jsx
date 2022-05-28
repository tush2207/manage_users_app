
  const rednerPagination = () => {
    if ( === 0) {
      return (
        <MDBPagination className="md-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn>NEXT</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if ( < pageLimit - 1 && users.lenght === pageLimit) {
      <MDBPagination className="md-0">
        <MDBPaginationItem>
          <MDBBtn>PREV</MDBBtn>
        </MDBPaginationItem>
        <MDBPaginationLink>{ + 1}</MDBPaginationLink>

        <MDBPaginationItem>
          <MDBBtn>NEXT</MDBBtn>
        </MDBPaginationItem>
      </MDBPagination>;
    } else {
      <MDBPagination className="md-0">
        <MDBPaginationItem>
          <MDBBtn>PREV</MDBBtn>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink>{ - 1}</MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>;
    }
  };
