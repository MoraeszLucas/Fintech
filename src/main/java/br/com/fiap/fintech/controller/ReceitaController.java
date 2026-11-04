package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Receita;
import br.com.fiap.fintech.model.Usuario;
import br.com.fiap.fintech.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    @GetMapping
    public ResponseEntity<List<Receita>> listarTodos() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receita> buscarReceita(@PathVariable Long id) {
        Optional<Receita> receita = service.buscarPorId(id);
        return receita.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Receita> criarReceita(@RequestBody Receita receita) {
        if (receita.getUsuario() == null || receita.getUsuario().getId() == null) {
            Usuario usuarioPadrao = new Usuario();
            usuarioPadrao.setId(1L);
            receita.setUsuario(usuarioPadrao);
        }

        if (receita.getData() == null) {
            receita.setData(LocalDate.now());
        }

        Receita novaReceita = service.salvar(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaReceita);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receita> atualizarReceita(@PathVariable Long id, @RequestBody Receita receitaAtualizada) {
        Optional<Receita> receitaExistente = service.buscarPorId(id);
        if (receitaExistente.isPresent()) {
            receitaAtualizada.setId(id);
            return ResponseEntity.ok(service.salvar(receitaAtualizada));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarReceita(@PathVariable Long id) {
        Optional<Receita> receitaExistente = service.buscarPorId(id);
        if (receitaExistente.isPresent()) {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
