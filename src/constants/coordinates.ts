export interface Coordinate{
    latitude: number;
    longitude: number;
  }

  export interface CountryCoordinates{
    sw : Coordinate[],
    au : Coordinate[],
    gr : Coordinate[],
    fr : Coordinate[]
  }

export const passengerCountriesCoordinates : CountryCoordinates = {
    sw: [
        {
            latitude: 47.0245117,
            longitude: 28.8322923
        },
        {
            latitude: 47.118886,
            longitude: 21.791628
        },
        {
            latitude: 48.2083537,
            longitude: 14.3725042
        },
        {
            latitude: 48.1371079,
            longitude: 11.5753822
        },
        {
            latitude: 45.5662672,
            longitude: 5.9203636
        },
        {
            latitude: 47.3969942,
            longitude: 8.6185666
        }
    ],
    au: [
        {
            latitude: 47.0245117,
            longitude: 28.8322923
        },
        {
            latitude: 47.118886,
            longitude: 21.791628
        },
        {
            latitude: 48.2083537,
            longitude: 14.3725042
        },
    ],
    gr: [
        {
            latitude: 47.0245117,
            longitude: 28.8322923
        },
        {
            latitude: 47.118886,
            longitude: 21.791628
        },
        {
            latitude: 48.2083537,
            longitude: 14.3725042
        },
        {
            latitude: 48.1371079,
            longitude: 11.5753822
        },
    ],
    fr : [
        {
            latitude: 47.0245117,
            longitude: 28.8322923
        },
        {
            latitude: 47.118886,
            longitude: 21.791628
        },
        {
            latitude: 48.2083537,
            longitude: 14.3725042
        },
        {
            latitude: 48.1371079,
            longitude: 11.5753822
        },
        {
            latitude: 45.5662672,
            longitude: 5.9203636
        },
    ]
}

export const parcelCoordinates: Coordinate[] = [
    {
        latitude: 47.0245117,
        longitude: 28.8322923
    },
    {
        latitude: 47.118886,
        longitude: 21.791628
    },
    {
        latitude: 48.2083537,
        longitude: 14.3725042
    },
    {
        latitude: 48.1371079,
        longitude: 11.5753822
    },
    {
        latitude: 45.5662672,
        longitude: 5.9203636
    },
    {
        latitude: 47.3969942,
        longitude: 8.6185666
    }

]