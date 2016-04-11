
//Module de L'GestForapp
var GestForApp = angular.module('GestForController', ['Datepicker']);
		
		//Controleur DeclarationFromation		
		GestForApp.controller('CtrlFor', ['$http',function($http) {
		
			var self = this;
						
			self.isNewTitleFormation = true;

			self.actionEnregistrer = function() {
				self.formation.titreformation= self.formation.titreformation.replace(/ +/g, " ");
				//self.formation.nombredemijournee= self.formation.nombredemijournee.replace(/ +/g, "");
				$http.post("api/formations", self.formation).success(function(data){		
					if(data == "true" || data == true){
						self.isNewTitleFormation = true;
				 		document.location.href = 'pageblancheformation.html';
					}
					else {
						self.isNewTitleFormation = false;
					}
				});
		    };
		}]);
		

		// Controleur EnregistrementCollab
		GestForApp.controller('CtrlCol', ['$http',function($http) {
			var self = this;
			
			self.isNewMatricule = "true";	
			self.actionEnregistrer = function() {
				
				//delete useless spaces between words 
				self.collaborateur.nom= self.collaborateur.nom.replace(/ +/g, " ");
				self.collaborateur.prenom= self.collaborateur.prenom.replace(/ +/g, " ");
				
				//post the form to the server
				$http.post("api/collaborateurs", self.collaborateur).success(function(data){
					 if(data == "true" || data == true) {
						 self.isNewMatricule = true; 
						 document.location.href = 'pageblanche.html';
					 }
					 else self.isNewMatricule = false;
				});
		    };
		}]);

		//Controleur DeclarationSession
		GestForApp.controller('CtrlSes', ['DatepickerService','$http',function(datepicker,$http) {
			var self = this;
			
									var testAjoutSessionFormation = function(){
										var dataToSend = {
												formation : 1,
												debut : "12-avril-2016|10:12",
												fin : "12-avril-2016|14:30",
												lieu : "Paris"
											};
											
											$http.post("api/formations", {titreformation:"Angular", nombredemijournee: 50}).success(function(data){	
											
											$http.post("api/formations", {titreformation:"Agile", nombredemijournee: 50}).success(function(data){		
												$http.post("api/sessions", dataToSend).success(function(data){		
													if(data == "true" || data == true){
														console.log("success : 1");
													}
													else console.log("fail : 1");
												
													dataToSend.formation = 2;
													$http.post("api/sessions", dataToSend).success(function(data){		
														if(data == "true" || data == true){
															console.log("success : 2");
														}
														else console.log("fail : 2");
													});
												});
						
											});
											});
									};			
			testAjoutSessionFormation();

				self.d1 = datepicker.build();
				self.d2 = datepicker.build();
						
			$http.get("api/formations").then(function(data){
				console.log(data)
			},
			function(){
				console.log("ERROOOOR")
			});
			
			console.log("test DS");
			
			function pad2(number) {
				   return (number < 10 ? '0' : '') + number
				}
			
			var myTab =[];
				var debutH = 8; var finH = 18; var pas = 30; var finM =30; var debutM=0;
				var nbPasHeure = 60/pas;
				var nbPasHeures = (finH-debutH)*nbPasHeure;
				var nbPasMinutes = (finM-debutM)/pas;

				for(var compteur=0; compteur<(nbPasHeures+nbPasMinutes); compteur++)
					{
						myTab.push(pad2((debutH + Math.floor(compteur/nbPasHeure))).toString() + ":" + pad2((compteur%nbPasHeure*pas)).toString());
					}

				self.monTab = myTab;
		
//				self.actionEnregistrer = function() {
//				self.session.nomFormation= self.session.nomFormation.replace(/ +/g, " ");
//				self.session.nomFormation= self.session.nomFormation.replace(/ +/g, " ");
//				$http.post("api/sessions", self.formation).success(function(data){
//			 		document.location.href = 'pageblancheSession.html';
//			 		
//				});
//		    };
		}]);

