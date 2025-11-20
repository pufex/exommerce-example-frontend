import { useSearchParams } from "react-router";
import { useCallback, useEffect } from "react";
import pagination from "../utils/pagination";
import PaginationButton from "../components/PaginationButton";
import { MoveLeft, MoveRight } from "lucide-react";

export const usePagination = (list, itemsPerPage) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const page = searchParams.get("page")
    const currentPage = page && !isNaN(Number(page))
        ? Number(page)
        : 1
    const firstIndex = (currentPage - 1) * itemsPerPage
    const lastIndex = currentPage * itemsPerPage

    useEffect(() => {
        const pagesCount = Math.ceil(list.length / itemsPerPage)
        const page = searchParams.get("page")
        const currentPage = page && !isNaN(Number(page))
            ? Number(page)
            : 1
        if (pagesCount < currentPage){
            setSearchParams(prev => {
                prev.set("page", "1")
                return prev
            })
        }
    }, [list, itemsPerPage])

    const goToPage = useCallback((page) => {
        setSearchParams(prev => {
            if (page > 0 && page <= list.length * itemsPerPage) {
                prev.set("page", page.toString())
            }
            return prev
        })
    }, [list, itemsPerPage])

    const nextPage = () => {
        setSearchParams(prev => {
            const page = Number(prev.get("page"))
            console.log(page)
            if (page < Math.ceil(list.length / itemsPerPage)) {
                prev.set("page", (page + 1).toString())
            }
            return prev
        })
    }

    const previousPage = () => {
        setSearchParams(prev => {
            const page = Number(prev.get("page"))
            if (page > 1) {
                prev.set("page", (page - 1).toString())
            }
            return prev
        })
    }

    const PaginationButtons = pagination(currentPage, Math.ceil(list.length / itemsPerPage), 5)
        .map((value) => (
            <PaginationButton
                key={value}
                onClick={() => goToPage(value)}
            >
                {value}
            </PaginationButton>
        ))

    const PreviousButton = currentPage !== 1 && Math.ceil(list.length / itemsPerPage) > 1
        ? <PaginationButton
            onClick={previousPage}
        >
            <MoveLeft />
        </PaginationButton>
        : null
    //currentPage !== Math.ceil(list.length / itemsPerPage) && 
    const NextButton = <PaginationButton
        onClick={nextPage}
    >
        <MoveRight />
    </PaginationButton>

    return {
        list: list.slice(firstIndex, lastIndex),
        PaginationButtons,
        PreviousButton,
        NextButton
    }
}