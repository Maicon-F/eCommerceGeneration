package com.IntegradorG3.LojaPrincipal.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table (name="tb_usuario")
public class Usuario {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private long id;

	@NotNull
	private String nome;
	
	@NotNull
	private String email;
	
	@NotNull
	@Size (min=8)
	private String senha;

	@NotNull
	private String endereco;
	
	@NotNull
	private String telefone;
	
	@NotNull
	private String tipo;
	
	
	@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("usuario")
	private List<Produto> produto;


	
	public List<Produto> getProdutos() {
		return produto;
	}


	public void setProdutos(List<Produto> produtos) {
		this.produto = produtos;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getSenha() {
		return senha;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}


	public String getEndereco() {
		return endereco;
	}


	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	

	public String getTelefone() {
		return telefone;
	}
	

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
}