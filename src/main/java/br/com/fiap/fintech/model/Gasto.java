package br.com.fiap.fintech.model;


import jakarta.persistence.*;

@Entity
@Table(name = "GASTO")
public class Gasto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gasto")
    private Long id;

    @Column(name = "gst_valor")
    private Double valor;

    @Column(name = "gst_descricao", length = 255)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_utilizador" , nullable = false)
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
}
