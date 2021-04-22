import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product-category.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductCategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductCategoryDetail = (props: IProductCategoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productCategoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productCategoryDetailsHeading">
          <Translate contentKey="petShopApp.productCategory.detail.title">ProductCategory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productCategoryEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="petShopApp.productCategory.name">Name</Translate>
            </span>
          </dt>
          <dd>{productCategoryEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="petShopApp.productCategory.description">Description</Translate>
            </span>
          </dt>
          <dd>{productCategoryEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/product-category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-category/${productCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productCategory }: IRootState) => ({
  productCategoryEntity: productCategory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryDetail);
