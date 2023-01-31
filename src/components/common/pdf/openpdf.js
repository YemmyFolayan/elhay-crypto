import React, { useState } from 'react';
// import {Page } from "react-pdf";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import ebook from '../../../assets/ebook.pdf';
import './openpdf.scss';

export const Openpdf = props => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  var onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  var changePage = offset => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  var previousPage = () => {
    changePage(-1);
  };

  var nextPage = () => {
    changePage(1);
  };

  return (
    <div className="openpdf-container">
      <Document
        file={ebook}
        // options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
        className="react-pdf__Page__canvas"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="openpdf-bottom">
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>

        <div className="openpdf-buttons">
          <button
            className="btn-left"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <div
            type="button"
            className="btn-right"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};
