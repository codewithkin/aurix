import { Express as ExpressType } from 'express-serve-static-core';

declare global {
    namespace Express {
        interface Request {
            // Add custom properties to Request here
        }
        
        interface Response {
            // Add custom properties to Response here
        }
    }
}
