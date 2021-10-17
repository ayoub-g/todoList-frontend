import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice'
import styleReducer from './styleSlice'
export default configureStore(
    {
        reducer: { todos: todosReducer, style: styleReducer },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        devTools: true
    })