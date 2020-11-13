/**
 * @file Defining user model
 * @author Yurrian Pierre-Boyer
 * 
 * @Additions adding fields for questionType and location
 * @author Soksivateara
 */

export interface Question {
    id: number;
    acceptedId: number;
    title: string;
    content: string;
    creationDate: Date;
    status: boolean;
    userID: number;
    questionType: string;
    location: string;
}
