import { MatPaginatorIntl } from "@angular/material/paginator";

export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.nextPageLabel = 'SIGUIENTE';
    customPaginatorIntl.previousPageLabel = 'ANTERIOR';
    customPaginatorIntl.itemsPerPageLabel = 'ELEMENTOS POR PÁGINA:';

    customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 DE ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} DE ${length}`;
    }

    return customPaginatorIntl;
}