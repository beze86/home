import { configureStore } from '@reduxjs/toolkit';

import userState from 'client/modules/auth/application/auth';

export const store = configureStore({
  reducer: {
    userState,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
