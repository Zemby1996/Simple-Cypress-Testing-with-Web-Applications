describe('Zaawansowana Lista Zadań', () => {
    beforeEach(() => {
        cy.visit('index.html');
        localStorage.clear();
    });

    it('Dodaje zadanie', () => {
        cy.get('#taskInput').type('Nowe zadanie');
        cy.get('#addTask').click();
        cy.get('#taskList li').should('have.length', 1);
    });

    it('Edytuje zadanie', () => {
        cy.get('#taskInput').type('Stare');
        cy.get('#addTask').click();

        cy.get('li span').click();
        cy.get('li input[type="text"]').clear().type('Nowe{enter}');

        cy.get('li span').should('contain', 'Nowe');
    });

    it('Filtrowanie zadań', () => {
        // dodaj dwa zadania
        cy.get('#taskInput').type('A');
        cy.get('#addTask').click();

        cy.get('#taskInput').type('B');
        cy.get('#addTask').click();

        // oznacz jedno jako wykonane
        cy.get('input[type="checkbox"]').first().click();

        // filtr aktywne
        cy.contains('Aktywne').click();
        cy.get('#taskList li').should('have.length', 1);

        // filtr wykonane
        cy.contains('Wykonane').click();
        cy.get('#taskList li').should('have.length', 1);
    });

    it('Sortuje zadania', () => {
        cy.get('#taskInput').type('Pierwsze');
        cy.get('#addTask').click();

        cy.wait(200);

        cy.get('#taskInput').type('Drugie');
        cy.get('#addTask').click();

        cy.get('li span').first().should('contain', 'Drugie');

        cy.get('#sort').click();
        cy.get('li span').first().should('contain', 'Pierwsze');
    });

    it('Zapamiętuje dane po przeładowaniu', () => {
        cy.get('#taskInput').type('Trwałe');
        cy.get('#addTask').click();

        cy.reload();
        cy.get('#taskList li').should('have.length', 1);
    });

    it('Opoznione dodanie (asynchronicznie)', () => {
        cy.intercept('POST', '/addTask', (req) => {
            cy.wait(1000);
            req.reply({ status: 200 });
        });

        cy.get('#taskInput').type('Async task');
        cy.get('#addTask').click();

        cy.wait(1000);
        cy.get('#taskList li').should('have.length', 1);
    });

    it('wyświetla poprawnie na desktopie', () => {
    cy.viewport(1280, 800);
    cy.get('#taskInput').should('be.visible');
    cy.addTask('Desktop Task');
    cy.get('#taskList li').should('have.length', 1);
  });

  it('wyświetla poprawnie na mobilnym', () => {
    cy.viewport('iphone-6'); // predefiniowany viewport
    cy.get('#taskInput').should('be.visible');
    cy.addTask('Mobile Task');
    cy.get('#taskList li').should('have.length', 1);
  });

  it('Dodaje zadania z fixture', () => {
    cy.fixture('tasks.json').then((tasks) => {
      tasks.forEach(task => {
        cy.addTask(task.text);
        if(task.done) cy.completeTask(tasks.indexOf(task));
      });
    });
    cy.get('#taskList li').should('have.length', 3);
    cy.get('#taskList li span.completed').should('have.length', 1);
  });

  // ------------------------
  //  Testy z custom commands
  // ------------------------
  it('Dodaje i usuwa zadanie z custom', () => {
    cy.addTask('Zadanie 1');
    cy.get('#taskList li').should('have.length', 1);

    cy.removeTask(0);
    cy.get('#taskList li').should('have.length', 0);
  });

  it('Oznacza zadanie jako wykonane z custom', () => {
    cy.addTask('Zadanie 2');
    cy.completeTask(0);
    cy.get('li span').first().should('have.class', 'completed');
  });
  
});
