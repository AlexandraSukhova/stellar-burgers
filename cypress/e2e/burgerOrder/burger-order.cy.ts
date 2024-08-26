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
  cy.visit('http://localhost:4000');
})

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
})

  it('order post with correct data', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sause]').contains('Добавить').click();

    cy.get('[data-cy=burger-total] button').click();

    cy.wait('@postOrder')
    .its('request.body')
    .should('deep.equal', {
      ingredients: ['2', '4', '1', '1']
    }) // Тестируем, что в тело запроса уходит массив с теми ингредиентам, которые были добавлены в конструктор
  })

  it('order modal worcks correctly', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();

    cy.get('[data-cy=burger-total] button').click();
    
    const modal = cy.get('[data-cy=modal]');

    modal
    .contains('1234')
    .should('exist'); // Проверяем, что модальное окно отображает корректные данные

    cy.get('[data-cy=modal-button-close]').click(); // Находим кнопу для закрытия модального окна
    modal // Проверяем, что модальное окно было закрыто и больше не отображается на странице
    .should('not.exist')
  })

  it('burger constructor should be clean after order success', () => {
    cy.get('[data-cy=ingredients-bun] button').contains('Добавить').click();
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();

    cy.get('[data-cy=burger-total] button').click();

    cy.get('[data-cy=modal-overlay]').click({force: true});

    cy.get('[data-cy=constructor-ingredients]')
    .find('li')
    .should('not.exist'); // Проверяем, что список ингридиентов очищен

    cy.get('[data-cy=constructor-bun-top]')
    .should('not.exist'); // Проверям, что верхняя секция под булку очищена

    cy.get('[data-cy=constructor-bun-bottom]')
    .should('not.exist') // Проверяем, что нижняя секция под булку очищена
  })
})
