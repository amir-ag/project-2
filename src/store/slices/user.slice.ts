import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../index';

interface UserState {
    email: string;
    accessToken: string;
    uid: string;
    status: string;
    firstName: string;
    lastName: string;
}

const initialState: UserState = {
    email: '',
    accessToken: '',
    uid: '',
    status: '',
    firstName: '',
    lastName: '',
};

type LoginProps = {
    email: string;
    password: string;
};

type SignupProps = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

const dbName = 'users';

export const logout = createAsyncThunk('user/logout', async () => {
    const auth = getAuth();
    return await signOut(auth);
});

export const login = createAsyncThunk('user/login', async ({ email, password }: LoginProps) => {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
});

export const signup = createAsyncThunk(
    'user/signup',
    async ({ email, password, firstName, lastName }: SignupProps) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        user &&
            (await addDoc(collection(db, dbName), {
                uid: user.uid,
                firstName,
                lastName,
            }));
        // implement another firebase call to add a user profile to firestore tied to the uid
        return {
            ...user,
            firstName,
            lastName,
        };
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'success';
            state.email = action.payload.user.email;
            state.accessToken = action.payload.user.stsTokenManager.accessToken;
            state.uid = action.payload.user.uid;
        });
        builder.addCase(login.rejected, (state) => {
            state.status = 'failed';
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
            console.log('payload: ', action.payload);
            state.status = 'success';
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.uid = action.payload.uid;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        });
        builder.addCase(signup.rejected, (state) => {
            state.status = 'failed';
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.email = '';
            state.accessToken = '';
            state.uid = '';
            state.status = '';
        });
    },
});

export const selectUser = (state: RootState) => state.user;
// export default userSlice.reducer
