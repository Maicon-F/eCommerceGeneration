package com.IntegradorG3.LojaPrincipal.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IntegradorG3.LojaPrincipal.model.UserLogin;
import com.IntegradorG3.LojaPrincipal.model.Usuario;
import com.IntegradorG3.LojaPrincipal.repository.UsuarioRepository;
import com.IntegradorG3.LojaPrincipal.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin ("*")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping("/logar")
	public ResponseEntity<UserLogin> Autentication(@RequestBody Optional<UserLogin> user){
		return usuarioService.Logar(user).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
	}
	
	@PostMapping("/cadastrar")
	public ResponseEntity<Usuario> Cadastrar(@Valid @RequestBody Usuario email){ //@Valid --> verifica se tudo solicitado foi entregue e trata a excecao
		return usuarioService.cadastrarUsuario(email).map(resp-> ResponseEntity.ok(resp)).orElse(ResponseEntity.status(400).build());
	}

	@GetMapping
	public List<Usuario> getAll(){
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> getBylId(@PathVariable long id){
		return repository.findById(id).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping
	public ResponseEntity<Usuario> post (@RequestBody Usuario novoUsuario) {
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(novoUsuario));
	}
	
	@PutMapping("/endereco/{id}")
	public ResponseEntity<Usuario> put (@RequestBody Usuario novoEndereco){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(repository.save(novoEndereco));
	}
	
	@PutMapping("/senha/{id}")
	public ResponseEntity<Usuario> put1 (@RequestBody Usuario novaSenha){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(repository.save(novaSenha));
	}
	
	@DeleteMapping("/{id}")
	public void delete (@PathVariable long id) {
		repository.deleteById(id);
	}
}
