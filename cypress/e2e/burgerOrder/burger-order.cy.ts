import { bunIngredients, constructorBunBottom, constructorBunTop, ingredientAddButtonText, ingredientsList, mainIngredients, modal, modalCloseButton, modalOverlay, orderPostButton, sauseIngredients } from "cypress/constants";

describe('order post correctly', function() {
  beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
  cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
  cy.intercept('POST', 'api/orders', {fixture: 'post-order.json'}).as('postOrder');

  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('test-refreshToken')
  );

  cy.setCookie('accessToken', 'test-accessToken');

  cy.viewport(1440, 800);
  cy.visit('');

  cy.get(bunIngredients).contains(ingredientAddButtonText).click();
  cy.get(mainIngredients).contains(ingredientAddButtonText).click();
  cy.get(sauseIngredients).contains(ingredientAddButtonText).click();

  cy.get(orderPostButton).click();
})

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
})

  it('order post with correct data', () => {
    cy.wait('@postOrder')
    .its('request.body')
    .should('deep.equal', {
      ingredients: ['2', '4', '1', '1']
    }) // Тестируем, что в тело запроса уходит массив с теми ингредиентам, которые были добавлены в конструктор
  })

  it('order modal worcks correctly', () => {
    cy.get(modal)
    .contains('1234')
    .should('exist'); // Проверяем, что модальное окно отображает корректные данные

    cy.get(modalCloseButton).click(); // Находим кнопу для закрытия модального окна
    cy.get(modal) // Проверяем, что модальное окно было закрыто и больше не отображается на странице
    .should('not.exist')
  })

  it('burger constructor should be clean after order success', () => {
    cy.get(modalOverlay).click({force: true});

    cy.get(ingredientsList)
    .find('li')
    .should('not.exist'); // Проверяем, что список ингридиентов очищен

    cy.get(constructorBunTop)
    .should('not.exist'); // Проверям, что верхняя секция под булку очищена

    cy.get(constructorBunBottom)
    .should('not.exist') // Проверяем, что нижняя секция под булку очищена
  })
})
