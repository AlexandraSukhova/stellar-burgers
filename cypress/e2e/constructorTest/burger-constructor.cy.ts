import { bun, bunIngredients, constructorBunBottom, constructorBunTop, ingredientAddButtonText, ingredientDeleteButton, ingredientsList, main, mainIngredients, sause, sauseIngredients, totalPrice } from "cypress/constants";

describe('constructor functions worcks correctly', function() {
    beforeEach(() => {
    cy.intercept('GET', 'ingredients', {fixture: 'ingredients.json'});
    cy.viewport(1440, 800);
    cy.visit('/');
  });

  it('buns in burger constructor should be added correctly', () => {
    cy.addIngredient(bunIngredients);

    cy.get(constructorBunTop)
    .contains(bun)
    .should('exist'); // Проверяем, что при нажатии на кнопку добавить выбранной булки она добавляется в верхнюю часть конструтора

    cy.get(constructorBunBottom)
    .contains(bun)
    .should('exist'); // Проверяем, что та же булка добавляется в нижнюю часть конструткора

    cy.get(ingredientsList)
    .find('li')
    .should('not.exist'); // Проверяем, что в средней части, предназанченной для других ингедиентов ничего не появилось
  })

  it('ingredients in burger constructor should be added correctly', () => {
    cy.addIngredient(mainIngredients);
    
    cy.get(ingredientsList)
    .contains(main)
    .should('exist'); // Проверяем что при нажатии на ингридиент, он добавился в список основных ингредиентов

    cy.get(sauseIngredients).contains(ingredientAddButtonText).click();
    
    cy.get(ingredientsList)
    .contains(sause)
    .should('exist'); // Проверяем что второй ингредиент также был добавлен в список основных ингредиентов
    
    cy.get(ingredientsList)
    .contains(main) // Проверяем, что при добавлении второго ингредиента первый не удалился
    .should('exist');

    cy.get(constructorBunBottom)
    .should('not.exist');

    cy.get(constructorBunTop)
    .should('not.exist'); // Проверяем что при этом булки не были добавлены в конструктор
  })

  it('ingredients in constructor should be move up and move down correctly', () => {
    cy.addIngredient(mainIngredients);
    cy.addIngredient(sauseIngredients); // Добавляем 2 ингредиента в конструктор
    cy.get(ingredientsList).find('li').first().as('firstIngredient');
    cy.get(ingredientsList).find('li').last().as('lastIngredient');

    cy.get('@firstIngredient')
    .contains(main)
    .should('exist'); // Проверяем, что первый ингредиент в конструкторе это Main 1

    cy.moveIngrToBottom('@firstIngredient');// Кликаем на первом ингредиенте по кнопке вниз

    cy.get('@firstIngredient')
    .contains(sause)
    .should('exist'); // Проверяем что на первом месте теперь стоит нижний ингредиент

    cy.get('@lastIngredient')
    .contains(main)
    .should('exist'); // Проверяем, что ингредиент не удалился из конструтора и опустился вниз

    cy.moveIngrToTop('@lastIngredient');// У нижнего ингредиента кликаем на кнопку вверх
    
    cy.get('@firstIngredient')
    .contains(main)
    .should('exist'); // Проверяем, что нижни ингредиент стоит на первом месте
  })

  it('ingredients in the constructor must be removed', () => {
    cy.addIngredient(mainIngredients);

    cy.get(ingredientsList)
    .contains(main)
    .should('exist'); // Проверяем, что ингредиент добавился в конструктор

    cy.deleteIngredient(ingredientsList); // Кликаем по корзине

    cy.get(ingredientsList)
    .contains(main)
    .should('not.exist'); // Проверяем, что в конструкторе нет удаленного ингредиента
  })

  it('bun in the constructor is not removed', () => {
    cy.addIngredient(bunIngredients);
    cy.get(constructorBunTop).contains(bun).as('constructorBun');
    
    cy.get('@constructorBun')
    .should('exist'); // Проверяем что булка в конструктор добавилась

    cy.deleteIngredient(constructorBunTop); // Находим кнопку удаления и производим клик

    cy.get('@constructorBun')
    .should('exist'); // Проверяем, что булка не удалилась из конструктора
  })

  it('total price of the burger should be considered correct', () => {
    cy.addIngredient(mainIngredients);

    cy.get(ingredientsList)
    .contains('424')
    .should('exist'); // Проверяем стоимость добавленного ингредиента в конструктор

    cy.get(totalPrice)
    .contains('424')
    .should('exist'); // Проверяем соответвие в отображении суммы заказа

    cy.addIngredient(bunIngredients);
    cy.get(constructorBunTop)
    .contains('1255')
    .should('exist'); // Добавлем в конструтор булки

    cy.get(totalPrice)
    .contains(`${424 + 1255*2}`)
    .should('exist'); // Проверяем что сумма изменилась корректно с учетом добавления двух булок

    cy.deleteIngredient(ingredientsList); // Удаляем ингредиент из заказа

    cy.get(totalPrice)
    .contains(`${424 + 1255*2 - 424}`)
    .should('exist'); // Проверям, что сумма изменилась корректно
  })
});

