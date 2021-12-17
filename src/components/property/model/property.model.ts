import { AddressModel, emptyAddress } from '../../../models/address.model';

export type PropertyModel = {
    id: string;
    name: string;
    egid: string;
    owner: string;
    yearOfConstruction?: number;
    janitor: string;
    address: AddressModel;
    rentalUnits?: string[];
};

export const emptyProperty: PropertyModel = {
    id: '',
    name: '',
    egid: '',
    owner: '',
    janitor: '',
    address: emptyAddress,
};

// Helper functions
export const getDisplayNameOfProperty = (p: PropertyModel) => {
    return `${p.name} (${p.egid})`;
};
