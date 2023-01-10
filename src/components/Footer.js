import Pagination from '../components/Pagination';

function Footer({currentPageUrl, prevPageUrl, nextPageUrl},{goToNextPage,goToPrevPage}) {
  return (
    <footer className="py-3 my-3">
        <Pagination
          goToNextPage = {nextPageUrl ? goToNextPage: null}
          goToPrevPage = {prevPageUrl ? goToPrevPage : null}
        />
    </footer>
  )
}

export default Footer;
