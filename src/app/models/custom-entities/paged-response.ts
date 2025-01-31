import { Metadata } from "./meta-data";

export interface PagedResponse<T> {
    data: Array<T>,
    metadata: Metadata
}