import {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from '../../firebase';

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential ? true : false;
    } catch (error) {
        return error.message
    }

};

export {
    login,
};