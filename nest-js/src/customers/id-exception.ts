

export class IdException extends Error {
    constructor(message?: string) {
        
        super(message || 'Provided ID is invalid');
    }
}