package br.com.fiap.fintech.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "receita")
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_receita")
    @SequenceGenerator(name = "seq_receita", sequenceName = "SQ_RECEITA", allocationSize = 1)
    @Column(name = "id_receita")
    @JsonProperty("id")
    private Long id;

    @Column(name = "rct_descricao")
    @JsonProperty("descricao")
    private String descricao;

    @Column(name = "rct_valor")
    @JsonProperty("valor")
    private Double valor;

    @Column(name = "rct_data")
    @JsonProperty("data")
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "id_ultilizador", nullable = false)
    @JsonIgnoreProperties({"gastos", "receitas", "senha"})
    private Usuario usuario;

    public Receita() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
