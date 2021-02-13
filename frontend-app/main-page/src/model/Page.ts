class Page<T> {
    content: T[];
    number: number;
    numberOfElement: number;
    size: number;
    totalPages: number;
    totalElements: number;

    constructor(
        content: T[],
        number: number,
        numberOfElement: number,
        size: number,
        totalPages: number,
        totalElements: number
    ) {
        this.content = content;
        this.number = number;
        this.numberOfElement = numberOfElement;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }
}

export default Page;
