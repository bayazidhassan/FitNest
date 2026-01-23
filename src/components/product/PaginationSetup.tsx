import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (n: number) => void;
};

const PaginationSetup = ({ totalPages, currentPage, setCurrentPage }: PaginationProps) => {
  return (
    <div>
      {totalPages > 1 && (
        <Pagination className="justify-center mt-6">
          <PaginationContent>
            {/* Previous button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {/* First page */}
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(1);
                }}
                className={currentPage === 1 ? 'bg-[#0D9488] text-white' : 'bg-gray-100 border'}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {/* Left ellipsis */}
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {/* Pages around current page */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => page > 1 && page < totalPages) // exclude first/last
              .filter((page) => Math.abs(page - currentPage) <= 2) // show 2 pages before/after
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    className={
                      page === currentPage ? 'bg-[#0D9488] text-white' : 'bg-gray-100 border'
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {/* Right ellipsis */}
            {currentPage < totalPages - 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {/* Last page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === totalPages}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(totalPages);
                  }}
                  className={
                    currentPage === totalPages ? 'bg-[#0D9488] text-white' : 'bg-gray-100 border'
                  }
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            {/* Next button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PaginationSetup;
