package br.com.fiap.fintech.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "receita")
public class Receita {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id_receita")
    private Long id;

    @Column(name = "rct_valor")
    private Double valor;

    @Column(name = "rct_descricao", length = 255)
    private String descricao;

    @Column(name = "rct_data")
    private LocalDate dataReceita;

    @ManyToOne
    @JoinColumn(name = "id_utilizador", nullable = false)
    private Usuario usuario;

    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public Double getValor(){ return valor; }
    public void setValor(Double valor){ this.valor = valor; }

    public String getDescricao(){ return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public LocalDate getDataReceita(){ return dataReceita; }
    public void setDataReceita(LocalDate dataReceita){ this.dataReceita = dataReceita; }

    public Usuario getUsuario(){ return usuario; }
    public void setUsuario(Usuario usuario){ this.usuario = usuario;}


}
