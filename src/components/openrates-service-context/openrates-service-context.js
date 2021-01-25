import React from 'react';

const {
  Provider: OpenratesServiceProvider,
  Consumer: OpenratesServiceConsumer
} = React.createContext();

export {
  OpenratesServiceProvider,
  OpenratesServiceConsumer
}