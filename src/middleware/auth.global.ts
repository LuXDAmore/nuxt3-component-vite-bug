// // UseStore
// import { useCognitoStore } from '~/store';

// // Auth
// export default defineNuxtRouteMiddleware(
//     async(): Promise<void> => {

//         const { initStoreFetchSessionUserTokenAndCheckFederatedSignIn } = useCognitoStore();

//         try {

//             await initStoreFetchSessionUserTokenAndCheckFederatedSignIn();

//         } catch( exception ) {

//             console.info(
//                 { exception }
//             );

//         }

//     }
// );

// Middleware
export default defineNuxtRouteMiddleware(
    () => {

        console.info( 'middleware' );

    }
);
