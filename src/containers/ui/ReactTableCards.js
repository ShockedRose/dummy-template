/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';

import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination';

import axios from 'axios';
import { FormattedDate } from 'react-intl';
import moment from 'moment';
import products from '../../data/products';

import 'assets/css/table-responsive.css';

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={`td_${cellIndex}`} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export const ReactTableWithPaginationCard = ({ dataUrl }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTxData() {
      const result = await axios.get(dataUrl, {
        headers: {
          Authorization:
            'YOURAPIHERE|SESSION',
        },
      });
      const reponseTransactions = result.data.data;
      setTransactions(reponseTransactions);
    }
    fetchTxData();
  }, [dataUrl]);

  const cols = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'idTransaction',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Description',
        accessor: 'txDescription',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>$ {props.value}</>,
      },
      {
        Header: 'Payment Method',
        accessor: 'cardType',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Tax Amount',
        accessor: 'tax',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>$ {props.value}</>,
      },
      {
        Header: 'Date',
        accessor: 'dateTms',
        cellClass: 'text-muted  w-40',
        Cell: (props) => (
          <>
            <FormattedDate
              value={moment(props.value).format('MMM DD h:mm A')}
              year="numeric"
              month="long"
              day="numeric"
              hour="numeric"
              minute="numeric"
            />
          </>
        ),
      },
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody className="table-responsive">
        <CardTitle>
          <IntlMessages id="table.react-pagination" />
        </CardTitle>
        {transactions && <Table columns={cols} data={transactions} />}
      </CardBody>
    </Card>
  );
};

export const ReactTableDivided = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Description',
        accessor: 'description',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Payment Method',
        accessor: 'method',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Tax Amount',
        accessor: 'tax',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <CardTitle>
        <IntlMessages id="table.divided" />
      </CardTitle>
      <Table columns={cols} data={products} divided />
    </div>
  );
};
