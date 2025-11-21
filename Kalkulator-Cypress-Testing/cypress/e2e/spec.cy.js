describe('Kalkulator', () => {

   beforeEach(() => {
    cy.visit('index.html');
  });

  // 
  // 1. Pola tekstowe są dostępne i można wprowadzać dane
  // 
  it('pozwala wprowadzać liczby do pól', () => {
    cy.get('#number1')
      .should('be.visible')
      .type('12')
      .should('have.value', '12');

    cy.get('#number2')
      .should('be.visible')
      .type('-5')
      .should('have.value', '-5');
  });

  // 
  // 2. Przyciski działają poprawnie (dodawanie, odejmowanie, mnożenie, dzielenie)
  // 
  it('wykonuje dodawanie', () => {
    cy.get('#number1').type('2');
    cy.get('#number2').type('3');
    cy.get('#add').click();
    cy.get('#result').should('have.value', '5');
  });

  it('wykonuje odejmowanie', () => {
    cy.get('#number1').type('5');
    cy.get('#number2').type('10');
    cy.get('#subtract').click();
    cy.get('#result').should('have.value', '-5');
  });

  it('wykonuje mnożenie', () => {
    cy.get('#number1').type('4');
    cy.get('#number2').type('5');
    cy.get('#multiply').click();
    cy.get('#result').should('have.value', '20');
  });

  it('wykonuje dzielenie', () => {
    cy.get('#number1').type('20');
    cy.get('#number2').type('5');
    cy.get('#divide').click();
    cy.get('#result').should('have.value', '4');
  });

  // 
  // 3. Wynik jest wyświetlany poprawnie dla różnych kombinacji liczb
  // 
  it('obsługuje liczby dodatnie, ujemne i zero', () => {
    // Ujemne * Ujemne = dodatnie
    cy.get('#number1').type('-2');
    cy.get('#number2').type('-3');
    cy.get('#multiply').click();
    cy.get('#result').should('have.value', '6');

    // Reset wpisów
    cy.get('#number1').clear().type('0');
    cy.get('#number2').clear().type('7');
    cy.get('#add').click();
    cy.get('#result').should('have.value', '7');

    // Ujemne + dodatnie
    cy.get('#number1').clear().type('-10');
    cy.get('#number2').clear().type('3');
    cy.get('#add').click();
    cy.get('#result').should('have.value', '-7');
  });

  // 
  // 4. Obsługa błędów – dzielenie przez zero
  // 
  it('nie pozwala dzielić przez zero i wyświetla komunikat błędu', () => {
    cy.get('#number1').type('10');
    cy.get('#number2').type('0');
    cy.get('#divide').click();

    cy.get('#error')
      .should('be.visible')
      .and('contain', 'Nie można dzielić przez zero');

    cy.get('#result').should('have.value', '');
  });

  // 
  // 5. Obsługa nieprawidłowych danych wejściowych (np. litery)
  // 
  it('wyświetla błąd przy błędnym wejściu', () => {
    cy.get('#number1').type('abc');
    cy.get('#number2').type('5');
    cy.get('#add').click();

    cy.get('#error')
      .should('be.visible')
      .and('contain', 'Proszę');

    cy.get('#result').should('have.value', '');
  });

});
