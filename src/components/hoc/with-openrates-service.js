import React from 'react';
import {OpenratesServiceConsumer} from '../openrates-service-context';

const withOpenratesService = () => (Wrapped) => {
  return (props) => {
    return (
      <OpenratesServiceConsumer>
        {
          (openratesService) => {
            return <Wrapped {...props}
                            openratesService={openratesService}/>;
          }
        }
      </OpenratesServiceConsumer>
    )
  }
}

export default withOpenratesService;