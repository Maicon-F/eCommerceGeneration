package com.IntegradorG3.LojaPrincipal.service;

import java.nio.charset.Charset;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.IntegradorG3.LojaPrincipal.model.UserLogin;
import com.IntegradorG3.LojaPrincipal.model.Usuario;
import com.IntegradorG3.LojaPrincipal.repository.UsuarioRepository;

import org.apache.commons.codec.binary.Base64;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;
	
	public Optional<Usuario> cadastrarUsuario(Usuario novoUsuario) {
		Optional <Usuario> usuarioExistente = repository.findByEmail(novoUsuario.getEmail());
		if (usuarioExistente.isEmpty()) { // cadastra novo usuario, se e somente se, ele nao existir.			
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String senhaEncoder = encoder.encode(novoUsuario.getSenha());
		novoUsuario.setSenha(senhaEncoder);
		return Optional.ofNullable(repository.save(novoUsuario));
		}
		else {
			return Optional.empty();
		}
	}
	public Optional<UserLogin> Logar(Optional<UserLogin> userLogin) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repository.findByEmail(userLogin.get().getEmail());

		if (usuario.isPresent()) {
			if (encoder.matches(userLogin.get().getSenha(), usuario.get().getSenha())) { // compara senha digitada e compara com a cadastrada no banco. codifica resultado
				String auth = userLogin.get().getEmail() + ":" + userLogin.get().getSenha(); //
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII"))); 

				String authHeader = "Basic " + new String(encodedAuth); //Seguido do espaço após a palavra 'basic' é o tokken

				userLogin.get().setToken(authHeader);
				userLogin.get().setNome(usuario.get().getEmail());
				userLogin.get().setSenha(usuario.get().getSenha());
				
				return userLogin;

			}
		}
		return null;

  }
}
