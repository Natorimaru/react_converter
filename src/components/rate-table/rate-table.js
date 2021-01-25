import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withOpenratesService} from '../hoc';
import {fetchRates, rateAddedToFavorites} from '../../actions';
import {compose} from '../../utils';

import {Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Checkbox, LinearProgress} from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const RateTableBody = ({rates, onAddedToFavorites}) => {
  return (
    <TableBody>
      {
        rates.map((rate) => {
          const {name, value, favorites} = rate;
          return (
            <TableRow key={name}>
              <TableCell component="th" scope="row">{name}</TableCell>
              <TableCell>{value}</TableCell>
              <TableCell>
                <Checkbox
                  icon={<FavoriteBorder/>}
                  checkedIcon={<Favorite/>}
                  name="favorites"
                  checked={favorites}
                  onChange={() => onAddedToFavorites(name, !favorites)}
                />
              </TableCell>
            </TableRow>
          )
        })
      }
    </TableBody>
  )
}

class RateTable extends Component {

  componentDidMount() {
    this.props.fetchRates();
  }

  render() {
    const {rates, loading, error, onAddedToFavorites} = this.props;

    if (loading) {
      return <LinearProgress color="secondary" />;
    }

    if (error) {}

    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="rate table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Current exchange rate</TableCell>
              <TableCell>Favorites</TableCell>
            </TableRow>
          </TableHead>
          <RateTableBody rates={rates} onAddedToFavorites={onAddedToFavorites} />
        </Table>
      </TableContainer>
    )
  }
}

const mapStateToProps = ({rateTable: {rates, loading, error}}) => {
  return {rates, loading, error};
}

const mapDispatchToProps = (dispatch, {openratesService}) => {
  return {
    fetchRates: fetchRates(openratesService, dispatch),
    onAddedToFavorites: (name, favorites) => dispatch(rateAddedToFavorites(name, favorites))
  }
}

export default compose(
  withOpenratesService(),
  connect(mapStateToProps, mapDispatchToProps)
)(RateTable);