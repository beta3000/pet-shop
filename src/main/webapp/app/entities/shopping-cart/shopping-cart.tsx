import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './shopping-cart.reducer';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShoppingCartProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ShoppingCart = (props: IShoppingCartProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { shoppingCartList, match, loading } = props;
  return (
    <div>
      <h2 id="shopping-cart-heading" data-cy="ShoppingCartHeading">
        <Translate contentKey="petShopApp.shoppingCart.home.title">Shopping Carts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="petShopApp.shoppingCart.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="petShopApp.shoppingCart.home.createLabel">Create new Shopping Cart</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {shoppingCartList && shoppingCartList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="petShopApp.shoppingCart.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="petShopApp.shoppingCart.placedDate">Placed Date</Translate>
                </th>
                <th>
                  <Translate contentKey="petShopApp.shoppingCart.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="petShopApp.shoppingCart.totalPrice">Total Price</Translate>
                </th>
                <th>
                  <Translate contentKey="petShopApp.shoppingCart.paymentMethod">Payment Method</Translate>
                </th>
                <th>
                  <Translate contentKey="petShopApp.shoppingCart.customerDetails">Customer Details</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shoppingCartList.map((shoppingCart, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${shoppingCart.id}`} color="link" size="sm">
                      {shoppingCart.id}
                    </Button>
                  </td>
                  <td>
                    {shoppingCart.placedDate ? <TextFormat type="date" value={shoppingCart.placedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    <Translate contentKey={`petShopApp.OrderStatus.${shoppingCart.status}`} />
                  </td>
                  <td>{shoppingCart.totalPrice}</td>
                  <td>
                    <Translate contentKey={`petShopApp.PaymentMethod.${shoppingCart.paymentMethod}`} />
                  </td>
                  <td>
                    {shoppingCart.customerDetails ? (
                      <Link to={`customer-details/${shoppingCart.customerDetails.id}`}>{shoppingCart.customerDetails.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${shoppingCart.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${shoppingCart.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${shoppingCart.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="petShopApp.shoppingCart.home.notFound">No Shopping Carts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ shoppingCart }: IRootState) => ({
  shoppingCartList: shoppingCart.entities,
  loading: shoppingCart.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
