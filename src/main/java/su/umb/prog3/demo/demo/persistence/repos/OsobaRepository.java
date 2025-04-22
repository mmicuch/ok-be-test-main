package su.umb.prog3.demo.demo.persistence.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import su.umb.prog3.demo.demo.persistence.entity.OsobaEntity;
import java.util.List;

@Repository
public interface OsobaRepository extends CrudRepository<OsobaEntity, Long> {
    List<OsobaEntity> findByMenoContainingIgnoreCaseOrPriezviskoContainingIgnoreCase(String meno, String priezvisko);
}
