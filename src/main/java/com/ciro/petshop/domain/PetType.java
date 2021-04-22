package com.ciro.petshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A PetType.
 */
@Entity
@Table(name = "pet_type")
public class PetType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "petType")
    @JsonIgnoreProperties(value = { "petType" }, allowSetters = true)
    private Set<Pet> pets = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PetType id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public PetType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Pet> getPets() {
        return this.pets;
    }

    public PetType pets(Set<Pet> pets) {
        this.setPets(pets);
        return this;
    }

    public PetType addPet(Pet pet) {
        this.pets.add(pet);
        pet.setPetType(this);
        return this;
    }

    public PetType removePet(Pet pet) {
        this.pets.remove(pet);
        pet.setPetType(null);
        return this;
    }

    public void setPets(Set<Pet> pets) {
        if (this.pets != null) {
            this.pets.forEach(i -> i.setPetType(null));
        }
        if (pets != null) {
            pets.forEach(i -> i.setPetType(this));
        }
        this.pets = pets;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PetType)) {
            return false;
        }
        return id != null && id.equals(((PetType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PetType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
