describe('Enregistrement Collaborateur', function () {
    var ctrl;
    var backend;
    var loc;
    var form;

    beforeEach(module('App'));

    beforeEach(inject(function ($controller, $httpBackend, $location) {
        backend = $httpBackend;
        loc = $location;
        loc.url('/RegisterCollaborator');
        ctrl = $controller('controllerRegisterCollaborator');
        form = {
            lastName: {$invalid: true, $error: {required: true}},
            firstName: {$invalid: true, $error: {required: true}},
            personnalIdNumber: {$invalid: true, $error: {required: true}},
            email: {$invalid: true, $error: {required: true}},
            password: {$invalid: true, $error: {required: true}},
            confirmPassword: {$invalid: true, $error: {required: true}},
            $invalid: true,
            $error: {required: [{}, {}, {}]}
        };
    }));

    describe('Test EnregistrementCollaborateur', function () {

        beforeEach(function () {
            backend.expectGET('api/collaborateurs/regex').respond('{"PERSONNAL_ID_NUMBER":"[A-Z]{3}[0-9]{4}","LAST_NAME":"^[a-zA-Z-\'. áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+$","FIRST_NAME":"^[a-zA-Z-\'. áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+$"}');
            ctrl.collaborator = {};
            backend.flush();
        });

        afterEach(function () {
            backend.verifyNoOutstandingExpectation();
            backend.verifyNoOutstandingRequest();
        });

        function fillFormCorrectlyBeforeSubmit(){
            expect(ctrl.isErrorInputMessageDisplayed(form.lastName, true)).toBeFalsy();
            ctrl.collaborator.lastName = "Darmet";
            expect(ctrl.collaborator.lastName).toMatch(ctrl.regex.lastName);
            refreshFormAfterFillingField(form, 'lastName');
            expect(ctrl.isErrorInputMessageDisplayed(form.lastName, false)).toBeFalsy();
            expect(ctrl.isErrorInputMessageDisplayed(form.firstName, true)).toBeFalsy();
            ctrl.collaborator.firstName = "Henri";
            expect(ctrl.collaborator.firstName).toMatch(ctrl.regex.firstName);
            refreshFormAfterFillingField(form, 'firstName');
            expect(ctrl.isErrorInputMessageDisplayed(form.firstName, false)).toBeFalsy();
            expect(ctrl.isErrorInputMessageDisplayed(form.personnalIdNumber, true)).toBeFalsy();
            ctrl.collaborator.personnalIdNumber = "HDA1234";
            expect(ctrl.collaborator.personnalIdNumber).toMatch(ctrl.regex.personnalIdNumber);
            refreshFormAfterFillingField(form, 'personnalIdNumber');
            expect(ctrl.isErrorInputMessageDisplayed(form.personnalIdNumber, false)).toBeFalsy();
            expectFormToBeFilled(form);
        }

        it('Valide', function () {
            fillFormCorrectlyBeforeSubmit();
            backend.expectPOST('api/collaborateurs', self.collaborator).respond({response: "NotPersisted"});
            ctrl.verifyForm(form);
            backend.flush();
            expect(ctrl.isNewPersonalIdNumber).toBeTruthy();
            expect(ctrl.isFalseForm).toBeFalsy();
            expect(ctrl.isThereAnEmptyField).toBeFalsy();
            expect(loc.path()).toBe('/Authentication');
        });

        it('Invalid because of matricule', function () {
            fillFormCorrectlyBeforeSubmit();
            backend.expectPOST('api/collaborateurs', self.collaborator).respond({response: "IdNumberPersisted"});
            ctrl.verifyForm(form);
            backend.flush();
            expect(ctrl.isNewPersonalIdNumber).toBeFalsy();
            expect(ctrl.isFalseForm).toBeFalsy();
            expect(ctrl.isThereAnEmptyField).toBeFalsy();
            expect(loc.path()).toBe('/RegisterCollaborator');
        });

        it('Invalid because of input avoid', function () {
            expect(ctrl.isErrorInputMessageDisplayed(form.lastName, true)).toBeFalsy();
            ctrl.collaborator.lastName = "Darmet@";
            expect(ctrl.collaborator.lastName).not.toMatch(ctrl.regex.lastName);
            refreshFormAfterFillingField(form, 'lastName', {pattern: true});
            expect(ctrl.isErrorInputMessageDisplayed(form.lastName, false)).toBeTruthy();
            expect(ctrl.isErrorInputMessageDisplayed(form.firstName, true)).toBeFalsy();
            ctrl.collaborator.firstName = "";
            expect(ctrl.isErrorInputMessageDisplayed(form.firstName, false)).toBeFalsy();
            expect(ctrl.isErrorInputMessageDisplayed(form.personnalIdNumber, true)).toBeFalsy();
            ctrl.collaborator.personnalIdNumber = "HDA1234";
            expect(ctrl.collaborator.personnalIdNumber).toMatch(ctrl.regex.personnalIdNumber);
            refreshFormAfterFillingField(form, 'personnalIdNumber');
            expect(ctrl.isErrorInputMessageDisplayed(form.personnalIdNumber, false)).toBeFalsy();
            ctrl.verifyForm(form);
            expect(ctrl.isNewPersonalIdNumber).toBeTruthy();
            expect(ctrl.isFalseForm).toBeFalsy();
            expect(ctrl.isThereAnEmptyField).toBeTruthy();
            expect(loc.path()).toBe('/RegisterCollaborator');
        });

        it('Invalid because of inputs incorrect', function () {
            expect(ctrl.isErrorInputMessageDisplayed(form.lastName, true)).toBeFalsy();
            ctrl.collaborator.lastName = "Darmet@";
            expect(ctrl.collaborator.lastName).not.toMatch(ctrl.regex.lastName);
            refreshFormAfterFillingField(form, 'lastName', {pattern: true});
            expect(ctrl.isErrorInputMessageDisplayed(form.lastName, false)).toBeTruthy();
            expect(ctrl.isErrorInputMessageDisplayed(form.firstName, true)).toBeFalsy();
            ctrl.collaborator.firstName = "888";
            expect(ctrl.collaborator.firstName).not.toMatch(ctrl.regex.firstName);
            refreshFormAfterFillingField(form, 'firstName', {pattern: true});
            expect(ctrl.isErrorInputMessageDisplayed(form.firstName, false)).toBeTruthy();
            expect(ctrl.isErrorInputMessageDisplayed(form.personnalIdNumber, true)).toBeFalsy();
            ctrl.collaborator.personnalIdNumber = "HDA1234";
            expect(ctrl.collaborator.personnalIdNumber).toMatch(ctrl.regex.personnalIdNumber);
            refreshFormAfterFillingField(form, 'personnalIdNumber');
            expect(ctrl.isErrorInputMessageDisplayed(form.personnalIdNumber, false)).toBeFalsy();
            expect(form.$error.required).toBeUndefined();
            ctrl.verifyForm(form);
            expect(ctrl.isNewPersonalIdNumber).toBeTruthy();
            expect(ctrl.isFalseForm).toBeTruthy();
            expect(ctrl.isThereAnEmptyField).toBeFalsy();
            expect(loc.path()).toBe('/RegisterCollaborator');
        });
    });
});