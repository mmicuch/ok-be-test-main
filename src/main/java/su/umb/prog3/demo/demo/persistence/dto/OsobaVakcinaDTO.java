package su.umb.prog3.demo.demo.persistence.dto;

import su.umb.prog3.demo.demo.persistence.entity.OsobaVakcina;

import java.time.LocalDate;

public class OsobaVakcinaDTO {
    public String osobaMeno;
    public String osobaPriezvisko;
    public String vakcinaNazov;
    public String vakcinaTyp;
    public LocalDate datumAplikacie;
    public int poradieDavky;

    public OsobaVakcinaDTO(OsobaVakcina entity) {
        this.osobaMeno = entity.getOsoba().getMeno();
        this.osobaPriezvisko = entity.getOsoba().getPriezvisko();
        this.vakcinaNazov = entity.getVakcina().getNazov();
        this.vakcinaTyp = entity.getVakcina().getTyp().toString();
        this.datumAplikacie = entity.getDatumAplikacie();
        this.poradieDavky = entity.getPoradieDavky();
    }
}
