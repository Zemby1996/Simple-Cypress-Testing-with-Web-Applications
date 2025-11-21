
const testUser = {
    username: '', // provide your test username
    password: '',  // provide your test password
    niepoprawny: 'zly_login_' + Date.now() 
};

describe('Kompleksowe Testy Automation Test Store', () => {

    
    describe('1. Testy Autentykacji', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('#customer_menu_top').click(); 
        });

        it('Logowanie POZYTYWNE (Autentykacja)', () => {
            cy.get('#loginFrm_loginname').type(testUser.username);
            cy.get('#loginFrm_password').type(testUser.password);
            cy.get('button[title="Login"]').click();
            
            cy.get('.heading1').should('contain', ' My Account');
        });

        it('Logowanie NEGATYWNE (Niepoprawny login)', () => {
            cy.get('#loginFrm_loginname').type(testUser.niepoprawny);
            cy.get('#loginFrm_password').type(testUser.password);
            cy.get('button[title="Login"]').click();
            
            cy.get('.alert-danger').should('be.visible')
                .and('contain', 'Error: Incorrect login or password provided.');
        });
    });

    
    describe('2. Kompleksowy Scenariusz Zakupowy', () => {
        before(() => {
            
            cy.visit('/index.php?rt=account/login');
            cy.get('#loginFrm_loginname').type(testUser.username);
            cy.get('#loginFrm_password').type(testUser.password);
            cy.get('button[title="Login"]').click();
            cy.url().should('include', 'account');
        });

       it('Dodanie produktu, zmiana ilości i Checkout (Formularze/Tablice)', () => {
    
           
            cy.visit('/index.php?rt=product/product&product_id=60');
            cy.get('#option307').select('Shirelle'); 
            cy.get('#product_quantity').clear().type('2'); 
            cy.get('.productpagecart a.cart').click();
            
            cy.url().should('include', 'checkout/cart'); 
            
            cy.get('#cart_checkout1').click(); 
           
            cy.url().should('include', 'checkout/confirm'); 
            
            cy.get('.maintext').should('contain', 'Checkout Confirmation');
                        
            cy.get('.contentpanel table.table-striped').find('tbody tr').its('length').should('be.gt', 1);
          
            cy.get('#checkout_btn').click(); 
           
            cy.get('.heading1').should('contain', ' Your Order Has Been Processed!');
        });
        
        
        it('Usuwanie produktu z koszyka i interakcja z koszykiem', () => {
            
            cy.visit('/index.php?rt=product/product&product_id=60'); 
            cy.get('#option307').select('Shirelle'); 
            cy.get('.productpagecart a.cart').click();
                        
            cy.url().should('include', 'checkout/cart'); 
                        
            cy.get('.maintext').should('contain', 'Shopping Cart'); 
                        
            cy.get('#cart').find('.btn-default').first().click(); 
                
            cy.get('.contentpanel').should('contain', 'Your shopping cart is empty!');
        });
    });
    
    
    describe('3. Testy interakcji i walidacji formularzy', () => {

       it('Testowanie resetowania hasła (Walidacja / Interakcja)', () => {
            cy.visit('/index.php?rt=account/login');
                        
            cy.get('a').contains('Forgot your password?').click();
                        
            cy.get('.maintext').should('contain', 'Forgot Your Password?');
                        
            cy.get('button[title="Continue"]').click();
                        
            cy.get('.alert-danger').should('be.visible')
                .and('contain', 'Error: The Email address was not provided or not found in our records, please try again!');
        });
    });
});