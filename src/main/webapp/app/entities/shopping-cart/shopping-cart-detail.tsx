import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './shopping-cart.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShoppingCartDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ShoppingCartDetail = (props: IShoppingCartDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { shoppingCartEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="shoppingCartDetailsHeading">
          <Translate contentKey="petShopApp.shoppingCart.detail.title">ShoppingCart</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{shoppingCartEntity.id}</dd>
          <dt>
            <span id="placedDate">
              <Translate contentKey="petShopApp.shoppingCart.placedDate">Placed Date</Translate>
            </span>
          </dt>
          <dd>
            {shoppingCartEntity.placedDate ? (
              <TextFormat value={shoppingCartEntity.placedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="petShopApp.shoppingCart.status">Status</Translate>
            </span>
          </dt>
          <dd>{shoppingCartEntity.status}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="petShopApp.shoppingCart.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{shoppingCartEntity.totalPrice}</dd>
          <dt>
            <span id="paymentMethod">
              <Translate contentKey="petShopApp.shoppingCart.paymentMethod">Payment Method</Translate>
            </span>
          </dt>
          <dd>{shoppingCartEntity.paymentMethod}</dd>
          <dt>
            <Translate contentKey="petShopApp.shoppingCart.customerDetails">Customer Details</Translate>
          </dt>
          <dd>{shoppingCartEntity.customerDetails ? shoppingCartEntity.customerDetails.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/shopping-cart" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shopping-cart/${shoppingCartEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ shoppingCart }: IRootState) => ({
  shoppingCartEntity: shoppingCart.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartDetail);
