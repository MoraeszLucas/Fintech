package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Gasto;
import br.com.fiap.fintech.service.GastoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/gastos")
public class GastoController {

    @Autowired
    private GastoService service;

    @GetMapping
    public ResponseEntity<Gasto> buscarGasto(@PathVariable Long id){
        Optional<Gasto> gasto = service.buscarPorId(id);
        return gasto.map(ResponseEntity ::ok )
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Gasto> criarGasto(@RequestBody Gasto gasto){
        Gasto novoGasto = service.salvar(gasto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoGasto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gasto> atualizarGasto(@PathVariable Long id, @RequestBody Gasto gastoAtualizado){
        Optional<Gasto> gastoExistente = service.buscarPorId(id);
        if (gastoExistente.isPresent()){
            gastoAtualizado.setId(id);
            return ResponseEntity.ok(service.salvar(gastoAtualizado));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarGasto(@PathVariable Long id){
        Optional<Gasto> gastoExistence = service.buscarPorId(id);
        if (gastoExistence.isPresent()){
            service.deletar(id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();


    }

}
