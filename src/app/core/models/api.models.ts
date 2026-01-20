export interface ApiResponse<T> {
    data: T;
    totalRows?: number;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    totalRows: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface QueryParams {
    [key: string]: string | number | boolean | undefined;
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
}

export interface Cattle {
    id: string;
    name: string;
    breed: string;
    age: number;
    weight: number;
    healthStatus: 'healthy' | 'sick' | 'quarantine';
    lastCheckup: Date;
    vaccinations: Vaccination[];
    owner: Owner;
}

export interface Vaccination {
    id: string;
    name: string;
    date: Date;
    nextDue: Date;
    veterinarian: string;
}

export interface Owner {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    quantity: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    company?: string;
    representative?: Representative;
}

export interface Representative {
    id: string;
    name: string;
    email: string;
    phone: string;
    region: string;
}

export interface Country {
    code: string;
    name: string;
    capital: string;
    region: string;
    population: number;
    area: number;
    languages: string[];
}

export interface Photo {
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    albumId: string;
}

export interface Node {
    key: string;
    label: string;
    data?: any;
    icon?: string;
    expandedIcon?: string;
    collapsedIcon?: string;
    children?: Node[];
    leaf?: boolean;
    selectable?: boolean;
}

export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

export interface ChartDataset {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    type?: 'bar' | 'line' | 'doughnut' | 'pie';
    fill?: boolean;
    tension?: number;
}
