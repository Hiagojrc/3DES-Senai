package com.senaisp.curso_spring.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senaisp.curso_spring.domain.Categoria;
import com.senaisp.curso_spring.repositories.CategoriaRepository;

@Service
public class CategoriaService {
	
	@Autowired
	private CategoriaRepository repo;
	
	public Categoria buscar(Integer id) {
		
		Optional<Categoria> obj = repo.findById(id);
		
		return obj.orElse(null);
	}
	public List<Categoria> retornaTudo() {
		List<Categoria> obj = repo.findAll();
		return obj;
	}

}
