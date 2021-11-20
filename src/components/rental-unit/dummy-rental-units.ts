import { RentalUnitModel } from './model/rental-unit.model';

export const dummyRentalUnits: RentalUnitModel[] = [
    { ewid: 1234, type: 'Parking Lot' },
    {
        ewid: 234556,
        floorLevel: 'Ground Floor',
        type: 'Apartment',
        surfaceInM2: 50,
        numberOfRooms: 3.5,
    },
    {
        ewid: 45344,
        floorLevel: '1. Floor',
        type: 'Apartment',
        surfaceInM2: 90,
        numberOfRooms: 4.5,
    },
    {
        ewid: 2323232,
        floorLevel: '2. Floor',
        type: 'Apartment',
        surfaceInM2: 130,
        numberOfRooms: 5,
    },
    {
        ewid: 4443221,
        floorLevel: '3. Floor',
        type: 'Apartment',
        surfaceInM2: 50,
        numberOfRooms: 3,
    },
];