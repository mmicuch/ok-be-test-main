package su.umb.prog3.demo.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import su.umb.prog3.demo.demo.persistence.entity.OsobaVakcina;
import su.umb.prog3.demo.demo.persistence.Services.OsobaVakcinaService;
import su.umb.prog3.demo.demo.persistence.dto.OsobaVakcinaDTO;

import java.util.List;

@RestController
@RequestMapping("/api/osobavakciny")
public class OsobaVakcinaController {

    private final OsobaVakcinaService osobaVakcinaService;

    public OsobaVakcinaController(OsobaVakcinaService osobaVakcinaService) {
        this.osobaVakcinaService = osobaVakcinaService;
    }

    // Get all osoba_vakcina records
    @GetMapping
    public ResponseEntity<List<OsobaVakcinaDTO>> getAllOsobaVakcina() {
        List<OsobaVakcinaDTO> dtos = osobaVakcinaService.getAllOsobaVakcina().stream()
                .map(OsobaVakcinaDTO::new)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    // Search osoba_vakcina by person name or surname
    @GetMapping("/search/{query}")
    public ResponseEntity<List<OsobaVakcinaDTO>> searchByPersonName(@PathVariable String query) {
        List<OsobaVakcinaDTO> dtos = osobaVakcinaService.findByPersonName(query).stream()
                .map(OsobaVakcinaDTO::new)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // Get osoba_vakcina by ID
    @GetMapping("/{id}")
    public ResponseEntity<OsobaVakcina> getOsobaVakcinaById(@PathVariable Long id) {
        return osobaVakcinaService.getOsobaVakcinaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new osoba_vakcina record (ADMIN only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OsobaVakcina> createOsobaVakcina(@RequestBody OsobaVakcina osobaVakcina) {
        return ResponseEntity.ok(osobaVakcinaService.createOsobaVakcina(osobaVakcina));
    }

    // Update an existing osoba_vakcina record
    @PutMapping("/{id}")
    public ResponseEntity<OsobaVakcina> updateOsobaVakcina(@PathVariable Long id, @RequestBody OsobaVakcina osobaVakcina) {
        return osobaVakcinaService.updateOsobaVakcina(id, osobaVakcina)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete osoba_vakcina by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOsobaVakcina(@PathVariable Long id) {
        if (osobaVakcinaService.deleteOsobaVakcina(id)) {
            return ResponseEntity.ok("OsobaVakcina bola vymazaná.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
