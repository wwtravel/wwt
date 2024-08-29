interface RouteStop {
    city: string;
    country: string;
    hours: number;
    is_destination: boolean;
    label: {
        en: string;
        fr: string;
        ro: string;
        ru: string;
    };
    lat: number;
    lon: number;
}

interface RouteBus {
    amenities: {
        ac: boolean;
        minibar: boolean;
        multimedia: boolean;
        socket: boolean;
        wc: boolean;
        wifi: boolean;
    };
    nr_of_seats: number;
}

interface PriceSheet {
    adult: number;
    child: number;
    student: number;
}

interface Travel {
    arrival: string; // ISO 8601 date-time string
    departure: string; // ISO 8601 date-time string
    free_places: number;
    orders: Array<{ id: string }>;
    price: PriceSheet;
    reserved_seats: number;
    route: {
        bus: RouteBus;
        stops: RouteStop[];
    };
}

export type TravelResponse = Travel[];