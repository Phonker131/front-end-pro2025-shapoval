import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../../store/rootReducer.js'
import rootSaga from '../../store/rootSaga.js'

export function renderWithStore(ui, { preloadedState } = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(sagaMiddleware)))
  sagaMiddleware.run(rootSaga)
  return { store, ...render(<Provider store={store}>{ui}</Provider>) }
}
