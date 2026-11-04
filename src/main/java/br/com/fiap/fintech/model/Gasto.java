package br.com.fiap.fintech.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "gasto")
public class Gasto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_gasto")
    @SequenceGenerator(name = "seq_gasto", sequenceName = "SQ_GASTO", allocationSize = 1)
    @Column(name = "id_gasto")
    @JsonProperty("id")
    private Long id;

    @Column(name = "gst_descricao")
    @JsonProperty("descricao")
    private String descricao;

    @Column(name = "gst_valor")
    @JsonProperty("valor")
    private Double valor;

    @Column(name = "gst_data")
    @JsonProperty("data")
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "id_ultilizador", nullable = false)
    @JsonIgnoreProperties({"gastos", "receitas", "senha"})
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    public Gasto() {}

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

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
}
