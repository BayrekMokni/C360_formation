package com.viseo.c360.formation.rest;

import javax.inject.Inject;
import javax.validation.Valid;

import org.hibernate.loader.custom.Return;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat.Value;
import com.viseo.c360.formation.dao.CollaborateurDAO;
import com.viseo.c360.formation.dao.FormationDAO;
import com.viseo.c360.formation.domain.collaborateur.Collaborateur;
import com.viseo.c360.formation.domain.formation.Formation;

@RestController
@RequestMapping(value="${endpoint.formations}")
public class FormationWS {

	@Inject
	FormationDAO formationDAO;
	
	@RequestMapping(method = RequestMethod.POST)
    @Transactional
    public void addFormation(@Valid @RequestBody Formation myFormation, BindingResult bindingResult){
		
		if(!(bindingResult.hasErrors())){

			formationDAO.addFormation(myFormation);
		}
    }

	//method GET pour recupérer les titres de formation 
	@RequestMapping(value = "/getString", method = RequestMethod.GET)
	@ResponseBody
    public String ReadFormation(){
		
		return Formation.regexTitreFormation;
	}
}	