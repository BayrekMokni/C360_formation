angular.module('controllers')
    .controller('controllerRegisterTraining', ['ngDialog','$http', '$location', '$timeout','SelectTrainingService', function (ngDialog,$http, $location,$timeout,SelectTrainingService) {

        var self = this;
        self.regex = {};
        self.isNewTrainingTitle = true;
        self.isFalseForm = false;
        self.isThereAnEmptyField = false;
        self.isTrainingSaved=false;
        /*** Recupération des regex **/
        $http.get("api/formations/regex").then(function (data) {
            self.regex.trainingTitle = new RegExp(data.data.TRAINING_TITLE);
            self.regex.numberHalfDays = new RegExp(data.data.NUMBER_HALF_DAYS);
        });
        /*** Recupération des Thèmes **/
        $http.get("api/themes").then(function (data) {
            self.topicList = data.data;
        });
        /*** Recupération des formations **/
        $http.get("api/formations").then(function (data) {
            self.trainingList = data.data;
        });

        self.isErrorInputMessageDisplayed = function (inputForm, focus) {
            return !inputForm.$error.required && inputForm.$invalid && !focus;
        };

        self.verifyForm = function (trainingForm) {
            self.isNewTrainingTitle = true;
            self.isFalseForm = false;
            self.isThereAnEmptyField = false;
            self.isTrainingSaved=false;
            if (trainingForm.$error.required) {
                self.isThereAnEmptyField = true;
                self.isFalseForm = false;
            }
            else if (trainingForm.$invalid) {
                self.isFalseForm = true;
                self.isThereAnEmptyField = false;
            }
            else {
                self.saveAction();
            }
        };

        self.saveAction = function () {
            self.training.trainingTitle = self.training.trainingTitle.replace(/ +/g, " ");
            $http.post("api/formations", self.training).then(function (response) {
                    self.trainingList.push(response.data);
                    self.isTrainingSaved = true;
                    self.training.trainingTitle = null;
                    self.training.topicDescription = null;
                    self.training.numberHalfDays = null;
                    self.setConfirmationMessageTimOut();
                },
                function (error) {
                    if (error.data.message === "trainingTitle") {
                        self.isNewTrainingTitle = false;
                    } else {
                        console.error(error);
                    }
                });
        };

        self.setConfirmationMessageTimOut = function () {
            $timeout(function () {
                self.isTrainingSaved = false;
            }, 3000);
        };

        var indexedTeams = [];
        self.returnTrainingListToFilter = function () {
            indexedTeams = [];
            return self.trainingList;
        };
        self.filterTopic = function (training) {
            var isNewTopic = indexedTeams.indexOf(training.topicDescription.name) == -1;
            if (isNewTopic) indexedTeams.push(training.topicDescription.name);
            return isNewTopic;
        };
        self.manageSession = function (training) {
            SelectTrainingService.select(training);
            $location.url("/ManageSession");
        };
        self.openAddTopicPopUp = function () {
            console.log("here");
            ngDialog.open({ template: 'templateId' });
        }
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/RegisterTraining', {
                templateUrl: 'templates/registerTraining.html',
                controller: 'controllerRegisterTraining',
                controllerAs: 'DF'
            })
    }
    ]);