import React, { useState, useEffect } from "react";
import ExpandLeft from "@/assets/svgs/expand_left.svg";
import ExpandRight from "@/assets/svgs/expand_right.svg";

interface PaginationProps {
    tableId: string;
    currentPage: number;
    totalRecords: number;
    recordsPerPage: number;
    arrRecordsPerPage?: Array<number>;
    handlePageChange: (tableId: string, newPage: number) => void;
    handleRecordsPerPageChange: (tableId: string, newRecordsPerPage: number) => void;
}

const PaginationSelect: React.FC<PaginationProps> = ({
    tableId,
    currentPage,
    totalRecords,
    recordsPerPage,
    arrRecordsPerPage = [10, 50, 100],
    handlePageChange,
    handleRecordsPerPageChange
}) => {
    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
    const [localRecordsPerPage, setLocalRecordsPerPage] = useState(recordsPerPage);

    useEffect(() => {
        setLocalCurrentPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setLocalRecordsPerPage(recordsPerPage);
    }, [recordsPerPage]);
    const totalPages = Math.ceil(totalRecords / localRecordsPerPage);
    const isFirstPage = localCurrentPage === 1;
    const isLastPage = localCurrentPage === totalPages;

    const handlePageChangePrevious = () => {
        if (!isFirstPage) {
            const newPage = Math.max(1, localCurrentPage - 1);
            setLocalCurrentPage(newPage);
            handlePageChange(tableId, newPage);
        }
    };

    const handlePageChangeNext = () => {
        if (!isLastPage) {
            const newPage = Math.min(totalPages, localCurrentPage + 1);
            setLocalCurrentPage(newPage);
            handlePageChange(tableId, newPage);
        }
    };

    const handleRecordsPerPageChangeInternal = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRecordsPerPage = Number(e.target.value);
        currentPage = 1
        setLocalRecordsPerPage(newRecordsPerPage);
        handleRecordsPerPageChange(tableId, newRecordsPerPage);
    };
    return (
        <div className="flex flex-row justify-between items-center gap-x-2 text-text text-xs font-normal">
            <p>Display</p>
            <select
                className="peer h-full rounded-[7px] border border-[#D9D9D9] border-t-transparent bg-transparent p-2 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:bg-gray-900 focus:border-[#40A9FF]"
                onChange={handleRecordsPerPageChangeInternal}
                value={recordsPerPage}
            >
                {arrRecordsPerPage.map((recordPerPage) => (
                    <option key={recordPerPage} value={recordPerPage}>
                        {recordPerPage}
                    </option>
                ))}

            </select>
            <p>of {totalRecords} results</p>
            <ExpandLeft
                className={`size-5 ${isFirstPage ? "text-gray" : "text-text"} hover:cursor-pointer`}
                onClick={handlePageChangePrevious}
            />
            <span className="mx-2">{currentPage}</span>
            <ExpandRight
                className={`size-5 ${isLastPage ? "text-gray" : "text-text"} hover:cursor-pointer`}
                onClick={handlePageChangeNext}
            />
        </div>
    );
};

export default PaginationSelect;