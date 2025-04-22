package su.umb.prog3.demo.demo.persistence.Services;

import org.springframework.stereotype.Service;
import su.umb.prog3.demo.demo.persistence.entity.OsobaVakcina;
import su.umb.prog3.demo.demo.persistence.entity.OsobaEntity;
import su.umb.prog3.demo.demo.persistence.repos.OsobaVakcinaRepository;
import su.umb.prog3.demo.demo.persistence.repos.OsobaRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OsobaVakcinaService {

    private final OsobaVakcinaRepository osobaVakcinaRepository;
    private final OsobaRepository osobaRepository;

    public OsobaVakcinaService(OsobaVakcinaRepository osobaVakcinaRepository, OsobaRepository osobaRepository) {
        this.osobaVakcinaRepository = osobaVakcinaRepository;
        this.osobaRepository = osobaRepository;
    }

    // Get all osoba_vakcina records
    public List<OsobaVakcina> getAllOsobaVakcina() {
        return osobaVakcinaRepository.findAll();
    }

    // Get osoba_vakcina by ID
    public Optional<OsobaVakcina> getOsobaVakcinaById(Long id) {
        return osobaVakcinaRepository.findById(id);
    }

    // Create a new osoba_vakcina record
    public OsobaVakcina createOsobaVakcina(OsobaVakcina osobaVakcina) {
        return osobaVakcinaRepository.save(osobaVakcina);
    }

    // Update an existing osoba_vakcina record
    public Optional<OsobaVakcina> updateOsobaVakcina(Long id, OsobaVakcina osobaVakcina) {
        if (osobaVakcinaRepository.existsById(id)) {
            osobaVakcina.setIdEntity(id);
            return Optional.of(osobaVakcinaRepository.save(osobaVakcina));
        } else {
            return Optional.empty();
        }
    }

    // Delete osoba_vakcina by ID
    public boolean deleteOsobaVakcina(Long id) {
        if (osobaVakcinaRepository.existsById(id)) {
            osobaVakcinaRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    // Find osoba_vakcina records by person name (searches by first or last name)
    public List<OsobaVakcina> findByPersonName(String query) {
        List<OsobaEntity> osoby = osobaRepository.findByMenoContainingIgnoreCaseOrPriezviskoContainingIgnoreCase(query, query);
        if (osoby.isEmpty()) {
            return Collections.emptyList();
        }

        List<OsobaVakcina> result = new ArrayList<>();
        for (OsobaEntity osoba : osoby) {
            List<OsobaVakcina> vakciny = osobaVakcinaRepository.findByOsoba(osoba);
            if (vakciny != null) {
                result.addAll(vakciny);
            }
        }

        return result;
    }
}
