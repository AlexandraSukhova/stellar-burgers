describe('modal with ingredients works correctly', function() {
  this.beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.viewport(1440, 800);
    cy.visit('http://localhost:4000');
  });

  it('modal with bun should open and close by button', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Bun 1').click(); // Находим ингридиент и кликаем по нему
    cy.get('[data-cy=modal]') // Проверяем, что модальное окно открыто
    .contains('Bun 1') // Проверяем, что в модальном окне именно тот ингредиент, по которому мы кликнули
    .should('exist')

    cy.get('[data-cy=modal-button-close]').click(); // Находим кнопу для закрытия модального окна
    cy.get('[data-cy=modal]') // Проверяем, что модальное окно было закрыто и больше не отображается на странице
    .should('not.exist')
  })

  it('modal with ingredient close by overlay', () => {
    cy.get('[data-cy=ingredients-main]').contains('Main 1').click();
    cy.get('[data-cy=modal-overlay]').click({force: true});
    cy.get('[data-cy=modal]') // Проверяем, что модальное окно было закрыто и больше не отображается на странице
    .should('not.exist');
  })
});

