import { createContext, Dispatch } from 'react';
import initialState from '../states/InitialState';

export const AppContext = createContext(initialState);

export const AppDispatchContext = createContext((() => undefined) as Dispatch<any>);
