describe('constructor functions worcks correctly', function() {
    beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.viewport(1440, 800);
    cy.visit('http://localhost:4000');
  });

  it('buns in burger constructor should be added correctly', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top]')
    .contains('Bun 1')
    .should('exist'); // Проверяем, что при нажатии на кнопку 'Добавить' выбранной булки она добавляется в верхнюю часть конструтора

    cy.get('[data-cy=constructor-bun-bottom]')
    .contains('Bun 1')
    .should('exist'); // Проверяем, что та же булка добавляется в нижнюю часть конструткора

    cy.get('[data-cy=constructor-ingredients]')
    .contains('Выберите начинку')
    .should('exist'); // Проверяем, что в средней части, предназанченной для других ингедиентов ничего не появилось
  })

  it('ingredients in burger constructor should be added correctly', () => {
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
    .contains('Main 1')
    .should('exist'); // Проверяем что при нажатии на ингридиент, он добаился в список основных ингредиентов

    cy.get('[data-cy=ingredients-sause]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
    .contains('Sause 1')
    .should('exist'); // Проверяем что второй ингредиент также был добавлен в список основных ингредиентов
    cy.get('[data-cy=constructor-ingredients]')
    .contains('Main 1') // Проверяем, что при добавлении второго ингредиента первый не удалился
    .should('exist');

    cy.get('[data-cy=constructor-bun-bottom]')
    .should('not.exist');

    cy.get('[data-cy=constructor-bun-top]')
    .should('not.exist'); // Проверяем что при этом булки не были добавлены в конструктор
  })

  it('ingredients in constructor should be move up and move down correctly', () => {
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sause]').contains('Добавить').click(); // Добавляем 2 ингредиента в конструктор
    
    cy.get('[data-cy=constructor-ingredients]')
    .find('li')
    .first()
    .contains('Main 1')
    .should('exist'); // Проверяем, что первый ингредиент в конструкторе это Main 1

    cy.get('[data-cy=constructor-ingredients]')
    .find('li')
    .first()
    .find('button')
    .last()
    .click(); // Кликаем на первом ингредиенте по кнопке вниз

    cy.get('[data-cy=constructor-ingredients]')
    .find('li')
    .first()
    .contains('Sause 1')
    .should('exist'); // Проверяем что на первом месте теперь стоит нижний ингредиент
    
    cy.get('[data-cy=constructor-ingredients]')
    .find('li')
    .last()
    .contains('Main 1')
    .should('exist'); // Проверяем, что ингредиент не удалился из конструтора и опустился вниз
    
    cy.get('[data-cy=constructor-ingredients]')
    .find('li')
    .last()
    .find('button')
    .first()
    .click(); // У нижнего ингредиента кликаем на кнопку вверх
    
    cy.get('[data-cy=constructor-ingredients]')
    .find('li')
    .first()
    .contains('Main 1')
    .should('exist'); // Проверяем, что нижни ингредиент стоит на первом месте
  })

  it('ingredients in the constructor must be removed', () => {
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    
    cy.get('[data-cy=constructor-ingredients]')
    .contains('Main 1')
    .should('exist'); // Проверяем, что ингредиент добавился в конструктор
    
    cy.get('[data-cy=constructor-ingredients]')
    .find('span')
    .find('.constructor-element__action')
    .click(); // Кликаем по корзине

    cy.get('[data-cy=constructor-ingredients]')
    .contains('Main 1')
    .should('not.exist'); // Проверяем, что в конструкторе нет удаленного ингредиента
  })

  it('bun in the constructor is not removed', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-top]')
    .contains('Bun 1')
    .should('exist'); // Проверяем что булка в конструктор добавилась

    cy.get('[data-cy=constructor-bun-top]')
    .find('span')
    .find('.constructor-element__action')
    .click() // Нахаим кнопку удаления и производим клик

    cy.get('[data-cy=constructor-bun-top]')
    .contains('Bun 1')
    .should('exist'); // Проверяем, что булка не удалилась из конструктора
  })

  it('total price of the burger should be considered correct', () => {
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();

    cy.get('[data-cy=constructor-ingredients]')
    .contains('424')
    .should('exist'); // Проверяем стоимость добавленного ингредиента в конструктор

    cy.get('[data-cy=total-price]')
    .contains('424')
    .should('exist'); // Проверяем соответвие в отображении суммы заказа

    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top]')
    .contains('1255')
    .should('exist'); // Добавлем в конструтор булки

    cy.get('[data-cy=total-price]')
    .contains(`${424 + 1255*2}`)
    .should('exist'); // Проверяем что сумма изменилась корректно с учетом добавления двух булок

    cy.get('[data-cy=constructor-ingredients]')
    .find('span')
    .find('.constructor-element__action')
    .click(); // Удаляем ингредиент из заказа 

    cy.get('[data-cy=total-price]')
    .contains(`${424 + 1255*2 - 424}`)
    .should('exist'); // Проверям, что сумма изменилась корректно 
  })
});

