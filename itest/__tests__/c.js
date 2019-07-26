describe('test_name', function () {

    it('what_it_does', function () {

        cy.viewport(1538, 797)

        cy.visit('https://gucci-auth.k8s.sytoss.intra/auth/realms/gucci/protocol/openid-connect/auth?client_id=gucci&response_type=code&redirect_uri=http://gucci-portal.k8s.sytoss.intra/gucci/oauth2&state=eyJvcmlnaW5hbFVybCI6Ii9wb3J0YWwifQ==')

        cy.get('#kc-form > #kc-form-wrapper > #kc-form-login > .form-group > #username').type('user1')

        cy.get('#kc-form > #kc-form-wrapper > #kc-form-login > .form-group > #password').type('user1')

        cy.get('#kc-form > #kc-form-wrapper > #kc-form-login > #kc-form-buttons > #kc-login').click()

        cy.visit('http://gucci-portal.k8s.sytoss.intra/portal/web')

        cy.get('body > main > nav > .menu-drawer').click()

        cy.get('.open > .pages > .nav > .nav-item:nth-child(2) > .nav-link').click()

        cy.visit('http://gucci-portal.k8s.sytoss.intra/portal/web/hfhs')

        cy.get('div > .myWizard > .multi-step > div > .fas').click()

        cy.get('.\_loading_overlay_wrapper > .Wrapper > .SearchWrapper > #imaginary_container > #searchForm_searchButton').click()

        cy.get('div > .CustomerItemSelection > div > a > span').click()

        cy.get('.\_loading_overlay_wrapper > .resultWrapper > #process-button > span > span').click()

    })

})
