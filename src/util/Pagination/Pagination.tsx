import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { IPercel } from "@/types";

type IProps = {
  senderAllPercels: IPercel;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

export default function PaginationFiLtering({
  senderAllPercels,
  setCurrentPage,
  currentPage,
}: IProps) {
  const totalPage = senderAllPercels?.meta?.totalPage;


  const handleDecrement = (currentPage: number) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleIncrement = (currentPage: number) => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log();
  return (
    <div className="">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handleDecrement(currentPage)}
            />
          </PaginationItem>

          {Array.from({ length: totalPage }, (_, index) => index + 1).map(
            (page) => (
              <PaginationItem onClick={() => setCurrentPage(page)} key={page}>
                <PaginationLink isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => handleIncrement(currentPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
