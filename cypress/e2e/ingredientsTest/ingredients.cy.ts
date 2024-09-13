import { bun, bunIngredients, modal, modalCloseButton, modalOverlay } from "cypress/constants";

describe('modal with ingredients works correctly', function() {
  this.beforeEach(() => {
    cy.intercept('GET', 'ingredients', {fixture: 'ingredients.json'});
    cy.viewport(1440, 800);
    cy.visit('/');

    cy.openIngredientModal(bunIngredients, bun);
    // Находим ингридиент и кликаем по нему
  });

  it('modal with bun should open and close by button', () => {
    cy.get(modal) // Проверяем, что модальное окно открыто
    .contains(bun) // Проверяем, что в модальном окне именно тот ингредиент, по которому мы кликнули
    .should('exist')

    cy.get(modalCloseButton).click(); // Находим кнопу для закрытия модального окна
    cy.get(modal) // Проверяем, что модальное окно было закрыто и больше не отображается на странице
    .should('not.exist')
  })

  it('modal with ingredient close by overlay', () => {
    cy.get(modalOverlay).click({force: true});
    cy.get(modal) // Проверяем, что модальное окно было закрыто и больше не отображается на странице
    .should('not.exist');
  })
});

