package com.ciro.petshop.service;

import com.ciro.petshop.domain.PetType;
import com.ciro.petshop.repository.PetTypeRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PetType}.
 */
@Service
@Transactional
public class PetTypeService {

    private final Logger log = LoggerFactory.getLogger(PetTypeService.class);

    private final PetTypeRepository petTypeRepository;

    public PetTypeService(PetTypeRepository petTypeRepository) {
        this.petTypeRepository = petTypeRepository;
    }

    /**
     * Save a petType.
     *
     * @param petType the entity to save.
     * @return the persisted entity.
     */
    public PetType save(PetType petType) {
        log.debug("Request to save PetType : {}", petType);
        return petTypeRepository.save(petType);
    }

    /**
     * Partially update a petType.
     *
     * @param petType the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PetType> partialUpdate(PetType petType) {
        log.debug("Request to partially update PetType : {}", petType);

        return petTypeRepository
            .findById(petType.getId())
            .map(
                existingPetType -> {
                    if (petType.getName() != null) {
                        existingPetType.setName(petType.getName());
                    }

                    return existingPetType;
                }
            )
            .map(petTypeRepository::save);
    }

    /**
     * Get all the petTypes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PetType> findAll() {
        log.debug("Request to get all PetTypes");
        return petTypeRepository.findAll();
    }

    /**
     * Get one petType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PetType> findOne(Long id) {
        log.debug("Request to get PetType : {}", id);
        return petTypeRepository.findById(id);
    }

    /**
     * Delete the petType by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PetType : {}", id);
        petTypeRepository.deleteById(id);
    }
}
