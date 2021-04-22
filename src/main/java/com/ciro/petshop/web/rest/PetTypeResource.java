package com.ciro.petshop.web.rest;

import com.ciro.petshop.domain.PetType;
import com.ciro.petshop.repository.PetTypeRepository;
import com.ciro.petshop.service.PetTypeService;
import com.ciro.petshop.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ciro.petshop.domain.PetType}.
 */
@RestController
@RequestMapping("/api")
public class PetTypeResource {

    private final Logger log = LoggerFactory.getLogger(PetTypeResource.class);

    private static final String ENTITY_NAME = "petType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PetTypeService petTypeService;

    private final PetTypeRepository petTypeRepository;

    public PetTypeResource(PetTypeService petTypeService, PetTypeRepository petTypeRepository) {
        this.petTypeService = petTypeService;
        this.petTypeRepository = petTypeRepository;
    }

    /**
     * {@code POST  /pet-types} : Create a new petType.
     *
     * @param petType the petType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new petType, or with status {@code 400 (Bad Request)} if the petType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pet-types")
    public ResponseEntity<PetType> createPetType(@Valid @RequestBody PetType petType) throws URISyntaxException {
        log.debug("REST request to save PetType : {}", petType);
        if (petType.getId() != null) {
            throw new BadRequestAlertException("A new petType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PetType result = petTypeService.save(petType);
        return ResponseEntity
            .created(new URI("/api/pet-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pet-types/:id} : Updates an existing petType.
     *
     * @param id the id of the petType to save.
     * @param petType the petType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated petType,
     * or with status {@code 400 (Bad Request)} if the petType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the petType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pet-types/{id}")
    public ResponseEntity<PetType> updatePetType(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PetType petType
    ) throws URISyntaxException {
        log.debug("REST request to update PetType : {}, {}", id, petType);
        if (petType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, petType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!petTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PetType result = petTypeService.save(petType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, petType.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pet-types/:id} : Partial updates given fields of an existing petType, field will ignore if it is null
     *
     * @param id the id of the petType to save.
     * @param petType the petType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated petType,
     * or with status {@code 400 (Bad Request)} if the petType is not valid,
     * or with status {@code 404 (Not Found)} if the petType is not found,
     * or with status {@code 500 (Internal Server Error)} if the petType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pet-types/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PetType> partialUpdatePetType(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PetType petType
    ) throws URISyntaxException {
        log.debug("REST request to partial update PetType partially : {}, {}", id, petType);
        if (petType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, petType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!petTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PetType> result = petTypeService.partialUpdate(petType);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, petType.getId().toString())
        );
    }

    /**
     * {@code GET  /pet-types} : get all the petTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of petTypes in body.
     */
    @GetMapping("/pet-types")
    public List<PetType> getAllPetTypes() {
        log.debug("REST request to get all PetTypes");
        return petTypeService.findAll();
    }

    /**
     * {@code GET  /pet-types/:id} : get the "id" petType.
     *
     * @param id the id of the petType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the petType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pet-types/{id}")
    public ResponseEntity<PetType> getPetType(@PathVariable Long id) {
        log.debug("REST request to get PetType : {}", id);
        Optional<PetType> petType = petTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(petType);
    }

    /**
     * {@code DELETE  /pet-types/:id} : delete the "id" petType.
     *
     * @param id the id of the petType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pet-types/{id}")
    public ResponseEntity<Void> deletePetType(@PathVariable Long id) {
        log.debug("REST request to delete PetType : {}", id);
        petTypeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
