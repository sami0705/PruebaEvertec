export interface PersonI {
    idPerson:        number;
    name:            string;
    lastName:        string;
    birthdate:       Date;
    photo:           null | string;
    idMaritalStatus: number;
    haveBrothers:    boolean;
}