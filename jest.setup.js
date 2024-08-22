import { setupServer } from 'msw/node';
import { handlers } from './src/services/mocks/handlers';


export const server = setupServer(...handlers);
