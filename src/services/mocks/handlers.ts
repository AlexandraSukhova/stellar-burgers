import {
  http,
  HttpResponse
} from 'msw'
import { ingredientsMock } from './mock-data';

const URL = 'https://norma.nomoreparties.space/api';

export const handlers = [
  http.get('https://norma.nomoreparties.space/api/ingredients', () => {
      return HttpResponse.json({data: ingredientsMock});
  })
];
