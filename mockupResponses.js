// localhost/api/trip/

{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "AEP-FTE",
            "createdAt": "2018-08-24T19:04:10.384Z",
            "updatedAt": "2018-08-24T19:04:10.384Z",
            "originId": null,
            "destinationId": null,
            "origin": null,
            "destination": null
        },
        {
            "id": 2,
            "name": "Test",
            "createdAt": "2018-08-24T19:04:10.445Z",
            "updatedAt": "2018-08-24T19:04:10.445Z",
            "originId": 1,
            "destinationId": 1,
            "origin": {
                "id": 1,
                "address": "Buenos Aires",
                "createdAt": "2018-08-24T19:04:10.420Z",
                "updatedAt": "2018-08-24T19:04:10.420Z"
            },
            "destination": {
                "id": 1,
                "address": "Calafate",
                "createdAt": "2018-08-24T19:04:10.431Z",
                "updatedAt": "2018-08-24T19:04:10.431Z"
            }
        }
    ],
    "message": "Success."
}

// localhost/api/trip/2

{
    "status": 200,
    "data": {
        "id": 2,
        "name": "Test",
        "createdAt": "2018-08-24T19:04:10.445Z",
        "updatedAt": "2018-08-24T19:04:10.445Z",
        "originId": 1,
        "destinationId": 1,
        "skyspots": [
            {
                "id": 3,
                "name": "Represa Salto Grande",
                "data": "https://aireapp.org/2018/07/19/represa-salto-grande/",
                "latitude": -67.6205063,
                "longitude": -45.8204256,
                "createdAt": "2018-08-24T19:04:10.454Z",
                "updatedAt": "2018-08-24T19:04:10.454Z",
                "skyspot_trip": {
                    "createdAt": "2018-08-24T19:04:10.510Z",
                    "updatedAt": "2018-08-24T19:04:10.510Z",
                    "tripId": 2,
                    "skyspotId": 3
                }
            },
            {
                "id": 4,
                "name": "423 Salto Grande",
                "data": "https://aireapp.org/2018/07/19/represa-salto-grande/",
                "latitude": -67.6205063,
                "longitude": -45.8204256,
                "createdAt": "2018-08-24T19:04:10.455Z",
                "updatedAt": "2018-08-24T19:04:10.455Z",
                "skyspot_trip": {
                    "createdAt": "2018-08-24T19:04:10.530Z",
                    "updatedAt": "2018-08-24T19:04:10.530Z",
                    "tripId": 2,
                    "skyspotId": 4
                }
            }
        ],
        "origin": {
            "id": 1,
            "address": "Buenos Aires",
            "createdAt": "2018-08-24T19:04:10.420Z",
            "updatedAt": "2018-08-24T19:04:10.420Z"
        },
        "destination": {
            "id": 1,
            "address": "Calafate",
            "createdAt": "2018-08-24T19:04:10.431Z",
            "updatedAt": "2018-08-24T19:04:10.431Z"
        }
    },
    "message": "Success."
}

// localhost/api/trip/2/skyspots

{
    "status": 200,
    "data": [
        {
            "id": 3,
            "name": "Represa Salto Grande",
            "data": "https://aireapp.org/2018/07/19/represa-salto-grande/",
            "latitude": -67.6205063,
            "longitude": -45.8204256,
            "createdAt": "2018-08-24T19:04:10.454Z",
            "updatedAt": "2018-08-24T19:04:10.454Z",
            "skyspot_trip": {
                "createdAt": "2018-08-24T19:04:10.510Z",
                "updatedAt": "2018-08-24T19:04:10.510Z",
                "tripId": 2,
                "skyspotId": 3
            }
        },
        {
            "id": 4,
            "name": "423 Salto Grande",
            "data": "https://aireapp.org/2018/07/19/represa-salto-grande/",
            "latitude": -67.6205063,
            "longitude": -45.8204256,
            "createdAt": "2018-08-24T19:04:10.455Z",
            "updatedAt": "2018-08-24T19:04:10.455Z",
            "skyspot_trip": {
                "createdAt": "2018-08-24T19:04:10.530Z",
                "updatedAt": "2018-08-24T19:04:10.530Z",
                "tripId": 2,
                "skyspotId": 4
            }
        }
    ],
    "message": "Success."
}

