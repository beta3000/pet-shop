import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPetType } from 'app/shared/model/pet-type.model';
import { getEntities as getPetTypes } from 'app/entities/pet-type/pet-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pet.reducer';
import { IPet } from 'app/shared/model/pet.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PetUpdate = (props: IPetUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { petEntity, petTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pet');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPetTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...petEntity,
        ...values,
        petType: petTypes.find(it => it.id.toString() === values.petTypeId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="petShopApp.pet.home.createOrEditLabel" data-cy="PetCreateUpdateHeading">
            <Translate contentKey="petShopApp.pet.home.createOrEditLabel">Create or edit a Pet</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : petEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pet-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pet-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="pet-name">
                  <Translate contentKey="petShopApp.pet.name">Name</Translate>
                </Label>
                <AvField
                  id="pet-name"
                  data-cy="name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="pet-petType">
                  <Translate contentKey="petShopApp.pet.petType">Pet Type</Translate>
                </Label>
                <AvInput id="pet-petType" data-cy="petType" type="select" className="form-control" name="petTypeId" required>
                  <option value="" key="0" />
                  {petTypes
                    ? petTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pet" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  petTypes: storeState.petType.entities,
  petEntity: storeState.pet.entity,
  loading: storeState.pet.loading,
  updating: storeState.pet.updating,
  updateSuccess: storeState.pet.updateSuccess,
});

const mapDispatchToProps = {
  getPetTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PetUpdate);
