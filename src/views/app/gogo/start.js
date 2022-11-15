import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { ReactTableWithPaginationCard } from 'containers/ui/ReactTableCards';

const Start = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.start" match={match} />
        <Separator className="mb-4" style={{ width: '30px' }} />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        {/* <p>
          <IntlMessages id="menu.start" />
        </p> */}
        {/* Transaction Columns:
          id, description, amount, method, tax, date
        
        */}
        <ReactTableWithPaginationCard dataUrl="https://sandbox.paguelofacil.com/PFManagementServices/api/v1/MerchantTransactions" />
      </Colxx>
    </Row>
  </>
);
export default Start;
