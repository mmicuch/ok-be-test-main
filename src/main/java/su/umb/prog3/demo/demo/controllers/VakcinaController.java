package su.umb.prog3.demo.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import su.umb.prog3.demo.demo.persistence.entity.Vakcina;
import su.umb.prog3.demo.demo.persistence.Services.VakcinaService;
import su.umb.prog3.demo.demo.persistence.dto.VakcinaDTO;
import su.umb.prog3.demo.demo.persistence.enums.TypVakciny;

import java.util.List;

@RestController
@RequestMapping("/api/vakciny")
public class VakcinaController {

    private final VakcinaService vakcinaService;

    public VakcinaController(VakcinaService vakcinaService) {
        this.vakcinaService = vakcinaService;
    }

    // Get all vaccines
    @GetMapping
    public ResponseEntity<List<VakcinaDTO>> getAllVakciny() {
        List<VakcinaDTO> dtos = vakcinaService.getAllVakciny().stream()
                .map(VakcinaDTO::new)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // Get vaccine by ID
    @GetMapping("/{id}")
    public ResponseEntity<Vakcina> getVakcinaById(@PathVariable Long id) {
        return vakcinaService.getVakcinaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new vaccine - only admin allowed
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Vakcina> addVakcina(@RequestBody VakcinaDTO vakcinaDTO) {
        Vakcina vakcina = new Vakcina();
        vakcina.setNazov(vakcinaDTO.getNazov());
        vakcina.setVyrobca(vakcinaDTO.getVyrobca());
        vakcina.setTyp(TypVakciny.valueOf(vakcinaDTO.getTyp()));
        return new ResponseEntity<>(vakcinaService.createVakcina(vakcina), HttpStatus.CREATED);
    }

    // Update an existing vaccine
    @PutMapping("/{id}")
    public ResponseEntity<Vakcina> updateVakcina(@PathVariable Long id, @RequestBody Vakcina vakcina) {
        return vakcinaService.updateVakcina(id, vakcina)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete vaccine by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVakcina(@PathVariable Long id) {
        if (vakcinaService.deleteVakcina(id)) {
            return ResponseEntity.ok("Vakcina bola vymazaná.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
