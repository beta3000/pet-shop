import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product-order.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductOrderDetail = (props: IProductOrderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productOrderEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productOrderDetailsHeading">
          <Translate contentKey="petShopApp.productOrder.detail.title">ProductOrder</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.id}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="petShopApp.productOrder.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.quantity}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="petShopApp.productOrder.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.totalPrice}</dd>
          <dt>
            <Translate contentKey="petShopApp.productOrder.product">Product</Translate>
          </dt>
          <dd>{productOrderEntity.product ? productOrderEntity.product.name : ''}</dd>
          <dt>
            <Translate contentKey="petShopApp.productOrder.cart">Cart</Translate>
          </dt>
          <dd>{productOrderEntity.cart ? productOrderEntity.cart.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/product-order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-order/${productOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productOrder }: IRootState) => ({
  productOrderEntity: productOrder.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderDetail);
