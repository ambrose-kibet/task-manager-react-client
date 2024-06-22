import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  pageCount: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
};

const Pagination = ({ handlePageChange, pageCount, currentPage }: Props) => {
  const prevPage = () => {
    if (currentPage === 1) return;
    handlePageChange(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage === pageCount) return;
    handlePageChange(currentPage + 1);
  };
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <div className="mt-auto flex w-full items-center justify-center pt-1">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prevPage} />
        </PaginationItem>
        {pages.map((page) => {
          if (page === currentPage) {
            return (
              <PaginationItem
                key={page}
                className="rounded-md bg-primary text-primary-foreground"
              >
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
            );
          }
          if (
            page === currentPage - 1 ||
            page === currentPage + 1 ||
            page === 1 ||
            page === pageCount
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (page === currentPage - 2 || page === currentPage + 2) {
            return <PaginationEllipsis key={page} />;
          }
          return null;
        })}

        <PaginationItem>
          <PaginationNext onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};
export default Pagination;
