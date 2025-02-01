import type {} from 'cypress';
import '../support/commands';

describe('Тестирование конструктора бургера и правильного получения данных', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'post-order.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    //Устанавливаем фальшивые токены перед каждым тестом
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'fakeRefreshToken');
    });
    cy.setCookie('accessToken', 'fakeAccessToken');
    //Посещаем главную страницу
    cy.viewport(1300, 800);
    cy.visit('/');
    //Ждем завершения запроса
    cy.wait('@getIngredients');
  });

  describe('Проверка отображения данных ингредиентов', () => {
    it('Ингредиенты каждой категории отображаются корректно', () => {
      cy.get('[data-cy=bun-ingredients] li').should('have.length.at.least', 1);
      cy.get('[data-cy=mains-ingredients] li').should(
        'have.length.at.least',
        1
      );
      cy.get('[data-cy=sauces-ingredients] li').should(
        'have.length.at.least',
        1
      );
    });
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление булки в конструктор', () => {
      // Проверяем что нет ингредиентов доме
      cy.get('[data-cy=constructor-bun-1]').should('not.exist');
      cy.get('[data-cy=constructor-bun-2]').should('not.exist');
      // Проверяем как они добавляются
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-1]').contains('Булка 1').should('exist');
      cy.get('[data-cy=constructor-bun-2]').contains('Булка 1').should('exist');
    });

    it('Добавление начинки и соуса в конструктор', () => {
      // Проверяем что нет ингредиентов доме
      cy.get('[data-cy=mains-ingredients]').should('not.exist');
      cy.get('[data-cy=sauces-ingredients]').should('not.exist');
      // Проверяем как они добавляются
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]').should(
        'contain',
        'Начинка 1'
      );
      cy.get('[data-cy=constructor-ingredients]').should('contain', 'Соус 1');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('Закрытие модального окна кнопкой закрытия', () => {
       // Проверяем, что модальное окно не открыто
      cy.get('[data-cy=modal]').should('not.exist');
      // Находим первый ингредиент и проверяем что модальное окно открыто
      cy.get('[data-cy=mains-ingredients] li').first().click();
      cy.get('[data-cy=modal]')
        .should('contain', 'Начинка 1')
        .and('be.visible');
      // Кликаем на закрытие проверяем, что закрыто
      cy.get('[data-cy=modal-button-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Закрытие модального окна через оверлей', () => {
      // Находим первый элемент, проверяем что модальное окно открыто
      cy.get('[data-cy=bun-ingredients] li').first().click();
      cy.get('[data-cy=modal]').should('contain', 'Булка 1').and('be.visible');
      // Кликаем по оверлэю используя force и проверяем, что закрыто окно
      cy.get('[data-cy=modal-overlay]').click({ force: true });
      cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Закрытие модального окна через клавишу Escape', () => {
      // Находим первый элемент, проверяем что модальное окно открыто
      cy.get('[data-cy=mains-ingredients] li').first().click();
      cy.get('[data-cy=modal]').should('be.visible');
      // Прверяем, что закрыто модальное через esc
      cy.get('body').type('{esc}');
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('mockRefreshToken')
      );
      cy.setCookie('accessToken', 'mockAccessToken');
    });
    //Очищаем хранилище и куки
    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('Проверка отображения данных пользователя', () => {
      cy.get('[data-cy=user]').should('contain', 'Евгения');
    });

    it('Успешное создание заказа', () => {
      // Добавляем ингредиенты
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      //Кликаем на кнопку оформить заказ, открытие мод окна и номер заказа
      cy.get('[type=button]').contains('Оформить заказ').click();
      cy.wait('@createOrder').its('response.statusCode').should('eq', 200);
      cy.get('[data-cy=modal]').should('contain', '052816').and('be.visible');
      // Закрываем модальное окно
      cy.get('[data-cy=modal-button-close]').click();
      cy.get('[data-cy=modal]').should('not.exist');

      cy.get('[data-cy=burger-constructor]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });
});
