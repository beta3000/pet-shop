import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPet } from 'app/shared/model/pet.model';
import { getEntities as getPets } from 'app/entities/pet/pet.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer-details.reducer';
import { ICustomerDetails } from 'app/shared/model/customer-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetailsUpdate = (props: ICustomerDetailsUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { customerDetailsEntity, users, pets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer-details' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getPets();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerDetailsEntity,
        ...values,
        user: users.find(it => it.id.toString() === values.userId.toString()),
        pet: pets.find(it => it.id.toString() === values.petId.toString()),
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
          <h2 id="petShopApp.customerDetails.home.createOrEditLabel" data-cy="CustomerDetailsCreateUpdateHeading">
            <Translate contentKey="petShopApp.customerDetails.home.createOrEditLabel">Create or edit a CustomerDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="genderLabel" for="customer-details-gender">
                  <Translate contentKey="petShopApp.customerDetails.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="customer-details-gender"
                  data-cy="gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && customerDetailsEntity.gender) || 'MALE'}
                >
                  <option value="MALE">{translate('petShopApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('petShopApp.Gender.FEMALE')}</option>
                  <option value="OTHER">{translate('petShopApp.Gender.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="customer-details-phone">
                  <Translate contentKey="petShopApp.customerDetails.phone">Phone</Translate>
                </Label>
                <AvField
                  id="customer-details-phone"
                  data-cy="phone"
                  type="text"
                  name="phone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine1Label" for="customer-details-addressLine1">
                  <Translate contentKey="petShopApp.customerDetails.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField
                  id="customer-details-addressLine1"
                  data-cy="addressLine1"
                  type="text"
                  name="addressLine1"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="customer-details-addressLine2">
                  <Translate contentKey="petShopApp.customerDetails.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField id="customer-details-addressLine2" data-cy="addressLine2" type="text" name="addressLine2" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="customer-details-city">
                  <Translate contentKey="petShopApp.customerDetails.city">City</Translate>
                </Label>
                <AvField
                  id="customer-details-city"
                  data-cy="city"
                  type="text"
                  name="city"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="customer-details-country">
                  <Translate contentKey="petShopApp.customerDetails.country">Country</Translate>
                </Label>
                <AvField
                  id="customer-details-country"
                  data-cy="country"
                  type="text"
                  name="country"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="customer-details-user">
                  <Translate contentKey="petShopApp.customerDetails.user">User</Translate>
                </Label>
                <AvInput id="customer-details-user" data-cy="user" type="select" className="form-control" name="userId" required>
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="customer-details-pet">
                  <Translate contentKey="petShopApp.customerDetails.pet">Pet</Translate>
                </Label>
                <AvInput id="customer-details-pet" data-cy="pet" type="select" className="form-control" name="petId" required>
                  <option value="" key="0" />
                  {pets
                    ? pets.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/customer-details" replace color="info">
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
  users: storeState.userManagement.users,
  pets: storeState.pet.entities,
  customerDetailsEntity: storeState.customerDetails.entity,
  loading: storeState.customerDetails.loading,
  updating: storeState.customerDetails.updating,
  updateSuccess: storeState.customerDetails.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getPets,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsUpdate);
