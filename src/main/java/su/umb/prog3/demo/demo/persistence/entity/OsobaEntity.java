package su.umb.prog3.demo.demo.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import su.umb.prog3.demo.demo.persistence.enums.Pohlavie;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;
import jakarta.persistence.OneToMany;

@Entity
public class OsobaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String meno;
    private String priezvisko;
    private int rokNarodenia;

    @Enumerated(EnumType.STRING)
    private Pohlavie pohlavie;

    @OneToMany(mappedBy = "osoba", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<OsobaVakcina> vakciny;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeno() {
        return meno;
    }

    public void setMeno(String meno) {
        this.meno = meno;
    }

    public String getPriezvisko() {
        return priezvisko;
    }

    public void setPriezvisko(String priezvisko) {
        this.priezvisko = priezvisko;
    }

    public int getRokNarodenia() {
        return rokNarodenia;
    }

    public void setRokNarodenia(int rokNarodenia) {
        this.rokNarodenia = rokNarodenia;
    }

    public Pohlavie getPohlavie() {
        return pohlavie;
    }

    public void setPohlavie(Pohlavie pohlavie) {
        this.pohlavie = pohlavie;
    }

    @Override
    public String toString() {
        return "OsobaEntity{" +
                "id=" + id +
                ", meno='" + meno + '\'' +
                ", priezvisko='" + priezvisko + '\'' +
                ", rokNarodenia=" + rokNarodenia +
                ", pohlavie=" + pohlavie +
                '}';
    }
}
