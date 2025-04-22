package su.umb.prog3.demo.demo.persistence.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import su.umb.prog3.demo.demo.persistence.entity.OsobaVakcina;
import su.umb.prog3.demo.demo.persistence.entity.OsobaEntity;
import java.util.List;

public interface OsobaVakcinaRepository extends JpaRepository<OsobaVakcina, Long> {
    List<OsobaVakcina> findByOsoba(OsobaEntity osoba);
}
