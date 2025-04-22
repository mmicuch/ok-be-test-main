package su.umb.prog3.demo.demo.persistence.dto;

import su.umb.prog3.demo.demo.persistence.entity.Vakcina;

public class VakcinaDTO {
    public Long id;
    public String nazov;
    public String vyrobca;
    public String typ;

    public VakcinaDTO() {
        // Prázdny konštruktor potrebný pre deserializáciu
    }

    public VakcinaDTO(Vakcina v) {
        this.id = v.getId();
        this.nazov = v.getNazov();
        this.vyrobca = v.getVyrobca();
        this.typ = v.getTyp().toString();
    }

    // Gettery a settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazov() {
        return nazov;
    }

    public void setNazov(String nazov) {
        this.nazov = nazov;
    }

    public String getVyrobca() {
        return vyrobca;
    }

    public void setVyrobca(String vyrobca) {
        this.vyrobca = vyrobca;
    }

    public String getTyp() {
        return typ;
    }

    public void setTyp(String typ) {
        this.typ = typ;
    }
}
