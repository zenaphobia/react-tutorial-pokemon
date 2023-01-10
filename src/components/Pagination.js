export default function pagination( {goToNextPage, goToPrevPage} ) {
  return (
    <div className="d-flex flex-direction-row align-items-center justify-content-center w-100">
      {goToPrevPage && <button className="mr" onClick={ goToPrevPage }>Previous</button>}
      {goToNextPage && <button className="mr" onClick={ goToNextPage}>Next</button>}
    </div>
  );
}
