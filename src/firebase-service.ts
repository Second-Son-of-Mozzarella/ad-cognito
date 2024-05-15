import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


const db = firebase.initializeApp({
    projectId: 'adhistoriam-f0763'
}).firestore();

export default () => {
    const readOperation = (collection: string, callback: (data: any[]) => void) => {
        const firebaseCollection = db.collection(collection);
    
        // Use onSnapshot to listen for real-time updates
        return firebaseCollection.onSnapshot((snapshot: any) => {
            const result = snapshot.docs.map((doc: any) => {
                return { id: doc.id, ...doc.data() };
            });
            // Handle the real-time data updates here, you can emit an event, call a function, etc.
            console.log("Real-time updates received:", result);
            callback(result);
        });
    };
    const createOperation = async (collection: any, data: any) => {
        const firebaseCollection = db.collection(collection);
        const firebaseObject = await firebaseCollection.add(data);
        console.log(firebaseObject);
        return firebaseObject;
    }
    const deleteOperation = async (collection: any, title: any) => {
        const firebaseCollection = db.collection(collection);
        const querySnapshot = await firebaseCollection.where('title', "==", title).get();        
        const result = querySnapshot.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        });
        firebaseCollection.doc(`${result[0].id}`).delete();
    }
    const findIdForDoc = async (collection: any, title: any) => {
        const firebaseCollection = db.collection(collection);
        const querySnapshot = await firebaseCollection.where('title', "==", title).get();        
        const result = querySnapshot.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        });
        return result[0];
    }
    const updateOperation = async (collection: any, updatedData: any) => {
        const firebaseCollection = db.collection(collection);
        firebaseCollection.doc(updatedData.id).update(updatedData);
    }
    return {
        readOperation,
        createOperation,
        deleteOperation,
        findIdForDoc,
        updateOperation
    };
};