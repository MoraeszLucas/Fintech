package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Categoria;
import br.com.fiap.fintech.model.Gasto;
import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.service.GastoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/gastos")
public class GastoController {

    @Autowired
    private GastoService service;

    @GetMapping
    public ResponseEntity<List<Gasto>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gasto> buscarGasto(@PathVariable Long id) {
        Optional<Gasto> gasto = service.buscarPorId(id);
        return gasto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Gasto> criarGasto(@RequestBody Gasto gasto) {
        if (gasto.getUsuario() == null || gasto.getUsuario().getId() == null) {
            Usuario usuarioPadrao = new Usuario();
            usuarioPadrao.setId(1L);
            gasto.setUsuario(usuarioPadrao);
        }

        if (gasto.getCategoria() == null || gasto.getCategoria().getId() == null) {
            Categoria categoriaPadrao = new Categoria();
            categoriaPadrao.setId(1L);
            gasto.setCategoria(categoriaPadrao);
        }

        if (gasto.getData() == null) {
            gasto.setData(LocalDate.now());
        }

        Gasto novoGasto = service.salvar(gasto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoGasto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gasto> atualizarGasto(@PathVariable Long id, @RequestBody Gasto gastoAtualizado) {
        Optional<Gasto> gastoExistente = service.buscarPorId(id);
        if (gastoExistente.isPresent()) {
            gastoAtualizado.setId(id);
            return ResponseEntity.ok(service.salvar(gastoAtualizado));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarGasto(@PathVariable Long id) {
        Optional<Gasto> gastoExistente = service.buscarPorId(id);
        if (gastoExistente.isPresent()) {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
