import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomerDetails } from 'app/shared/model/customer-details.model';
import { getEntities as getCustomerDetails } from 'app/entities/customer-details/customer-details.reducer';
import { getEntity, updateEntity, createEntity, reset } from './shopping-cart.reducer';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IShoppingCartUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ShoppingCartUpdate = (props: IShoppingCartUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { shoppingCartEntity, customerDetails, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/shopping-cart');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomerDetails();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.placedDate = convertDateTimeToServer(values.placedDate);

    if (errors.length === 0) {
      const entity = {
        ...shoppingCartEntity,
        ...values,
        customerDetails: customerDetails.find(it => it.id.toString() === values.customerDetailsId.toString()),
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
          <h2 id="petShopApp.shoppingCart.home.createOrEditLabel" data-cy="ShoppingCartCreateUpdateHeading">
            <Translate contentKey="petShopApp.shoppingCart.home.createOrEditLabel">Create or edit a ShoppingCart</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : shoppingCartEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="shopping-cart-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="shopping-cart-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="placedDateLabel" for="shopping-cart-placedDate">
                  <Translate contentKey="petShopApp.shoppingCart.placedDate">Placed Date</Translate>
                </Label>
                <AvInput
                  id="shopping-cart-placedDate"
                  data-cy="placedDate"
                  type="datetime-local"
                  className="form-control"
                  name="placedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.shoppingCartEntity.placedDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="shopping-cart-status">
                  <Translate contentKey="petShopApp.shoppingCart.status">Status</Translate>
                </Label>
                <AvInput
                  id="shopping-cart-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && shoppingCartEntity.status) || 'COMPLETED'}
                >
                  <option value="COMPLETED">{translate('petShopApp.OrderStatus.COMPLETED')}</option>
                  <option value="PAID">{translate('petShopApp.OrderStatus.PAID')}</option>
                  <option value="PENDING">{translate('petShopApp.OrderStatus.PENDING')}</option>
                  <option value="CANCELLED">{translate('petShopApp.OrderStatus.CANCELLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="totalPriceLabel" for="shopping-cart-totalPrice">
                  <Translate contentKey="petShopApp.shoppingCart.totalPrice">Total Price</Translate>
                </Label>
                <AvField
                  id="shopping-cart-totalPrice"
                  data-cy="totalPrice"
                  type="text"
                  name="totalPrice"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="paymentMethodLabel" for="shopping-cart-paymentMethod">
                  <Translate contentKey="petShopApp.shoppingCart.paymentMethod">Payment Method</Translate>
                </Label>
                <AvInput
                  id="shopping-cart-paymentMethod"
                  data-cy="paymentMethod"
                  type="select"
                  className="form-control"
                  name="paymentMethod"
                  value={(!isNew && shoppingCartEntity.paymentMethod) || 'CREDIT_CARD'}
                >
                  <option value="CREDIT_CARD">{translate('petShopApp.PaymentMethod.CREDIT_CARD')}</option>
                  <option value="IDEAL">{translate('petShopApp.PaymentMethod.IDEAL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="shopping-cart-customerDetails">
                  <Translate contentKey="petShopApp.shoppingCart.customerDetails">Customer Details</Translate>
                </Label>
                <AvInput
                  id="shopping-cart-customerDetails"
                  data-cy="customerDetails"
                  type="select"
                  className="form-control"
                  name="customerDetailsId"
                  required
                >
                  <option value="" key="0" />
                  {customerDetails
                    ? customerDetails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/shopping-cart" replace color="info">
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
  customerDetails: storeState.customerDetails.entities,
  shoppingCartEntity: storeState.shoppingCart.entity,
  loading: storeState.shoppingCart.loading,
  updating: storeState.shoppingCart.updating,
  updateSuccess: storeState.shoppingCart.updateSuccess,
});

const mapDispatchToProps = {
  getCustomerDetails,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartUpdate);
