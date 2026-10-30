package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "\"user\"") // Aspas escapadas porque 'user' é uma palavra reservada no Oracle
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id;

    @Column(name = "usr_name", length = 100)
    private String nome;

    @Column(name = "usr_email", length = 255)
    private String email;

    @Column(name = "usr_password", length = 255)
    private String senha;

    @Column(name = "usr_dataregister")
    private LocalDate dataRegistro;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public LocalDate getDataRegistro() { return dataRegistro; }
    public void setDataRegistro(LocalDate dataRegistro) { this.dataRegistro = dataRegistro; }
}
