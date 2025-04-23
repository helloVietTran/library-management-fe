import { customAlphabet } from 'nanoid';


export const generateRandomId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);
