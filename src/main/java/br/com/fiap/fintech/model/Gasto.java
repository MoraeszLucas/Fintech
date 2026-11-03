package br.com.fiap.fintech.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "GASTO")
public class Gasto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gasto")
    @JsonProperty("id")
    private Long id;

    @Column(name = "gst_valor")
    @JsonProperty("valor")
    private Double valor;

    @Column(name = "gst_descricao", length = 255)
    @JsonProperty("descricao")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_ultilizador" , nullable = false)
    @JsonIgnoreProperties( {"gastos", "receitas", "senha"} )
    private Usuario usuario;


    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao(){
        return descricao;
    }

    public Double getValor(){
        return valor;
    }
}
