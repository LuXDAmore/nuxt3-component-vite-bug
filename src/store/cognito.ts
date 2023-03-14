// AWS Cognito - Auth
// import { Auth } from '@aws-amplify/auth';
// import { Amplify } from '@aws-amplify/core';

// Built-in
import { useCognitoConfig } from '#imports';

// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Interfaces
interface cognitoSession extends Object {
    getIdToken: null,
    accessToken: {
        jwtToken: string|null,
        payload: {
            username: string|null,
            exp: number,
            'cognito:groups': Array<unknown>,
        },
    },
}
interface cognitoUser extends Object {
    username: string|null,
    userSub: object|null,
    attributes: {
        sub: object|null,
    },
}

// Define Store
const useCognitoStore = defineStore(
    'cognitoStore',
    {
        actions: {
            // async answerCustomChallenge(
            //     {
            //         user,
            //         answer,
            //     }: {
            //         user: string,
            //         answer: string,
            //     }
            // ) : Promise<void> {

            //     try {

            //         const userData = await Auth.sendCustomChallengeAnswer(
            //             user,
            //             answer
            //         );

            //         if( userData )
            //             this.setUser( userData );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // async changePassword(
            //     {
            //         username,
            //         code,
            //         newPassword,
            //     }: {
            //         username: string,
            //         code: string,
            //         newPassword: string,
            //     }
            // ) : Promise<void> {

            //     try {

            //         await Auth.forgotPasswordSubmit(
            //             username,
            //             code,
            //             newPassword
            //         );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // async confirmSignUp(
            //     {
            //         user,
            //         confirmationCode,
            //     }: {
            //         user: string,
            //         confirmationCode: string,
            //     }
            // ) : Promise<void> {

            //     try {

            //         await Auth.confirmSignUp(
            //             user,
            //             confirmationCode
            //         );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // async federatedSignIn( provider?: string ): Promise<void> {

            //     const { cognito: { provider: cognitoProvider } } = useRuntimeConfig();

            //     try {

            //         await Auth.federatedSignIn(
            //             { provider: provider || cognitoProvider }
            //         );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // async fetchSessionUserAndToken(): Promise<void> {

            //     try {

            //         const response = await Auth.currentAuthenticatedUser();

            //         if( ! response )
            //             throw new Error( 'Empty response from {currentAuthenticatedUser} method' );

            //         const { signInUserSession, ... user } = response;

            //         if( signInUserSession ) {

            //             this.setSession( signInUserSession );

            //             const token = signInUserSession.getIdToken().getJwtToken();

            //             if( token )
            //                 this.setToken( token );

            //         }

            //         if( user )
            //             this.setUser( user );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // async forgotPassword( username: string ): Promise<void> {

            //     try {

            //         await Auth.forgotPassword( username );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            initStore(): void {

                if( this.isInitialized )
                    return;

                const configuration = useCognitoConfig();

                console.info( configuration );

                // AWS settings
                // Amplify.I18n?.setLanguage( configuration.I18n.language );
                // Amplify.configure( configuration );

                // Set data
                // this.setConfiguration( configuration );
                // this.setInitialized( true );

            },
            // async initStoreFetchSessionUserTokenAndCheckFederatedSignIn(): Promise<void> {

            //     try {

            //         this.initStore();

            //         // Check if user was already logged-in
            //         await this.fetchSessionUserAndToken();

            //         // If not logged, show the SSO interface
            //         if( this.isLoggedIn )
            //             ! this.$initialized && this.refreshTokenIntervalCreate();
            //         else
            //             await this.federatedSignIn();

            //         this.$initialized = true;

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // refreshTokenIntervalCreate() {

            //     // Destroy Interval
            //     this.refreshTokenIntervalDestroy();

            //     // Refresh Time: 1_800_000 ~= 30 min
            //     const REFRESH_DELAY = 1_400_000;

            //     if( process.env.NODE_ENV !== 'production' ) {

            //         console.warn(
            //             'AuthToken refresh available in:',
            //             REFRESH_DELAY,
            //             'milliseconds'
            //         );

            //     }

            //     // Create interval
            //     this.$intervalId = Number(
            //         setInterval(
            //             async() => {

            //                 await this.fetchSessionUserAndToken();

            //                 if( process.env.NODE_ENV !== 'production' )
            //                     console.warn( '[AuthToken refreshed]' );

            //             },
            //             REFRESH_DELAY
            //         )
            //     );

            // },
            // refreshTokenIntervalDestroy() {

            //     // Clean interval
            //     if( ! this.$intervalId )
            //         return;

            //     clearInterval( this.$intervalId );

            //     this.$intervalId = undefined;

            // },
            // async registerUser(
            //     {
            //         username,
            //         password,
            //         attributes,
            //         validationData,
            //     }: {
            //         username: string,
            //         password: string,
            //         attributes: Array<string>,
            //         validationData: object,
            //     }
            // ): Promise<void> {

            //     try {

            //         const userData = await Auth.signUp(
            //             {
            //                 attributes,
            //                 autoSignIn: { enabled: true },
            //                 password,
            //                 username,
            //                 validationData,
            //             }
            //         );

            //         if( userData )
            //             this.setUser( userData );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // async resendConfirmation( username: string ): Promise<void> {

            //     try {

            //         await Auth.resendSignUp( username );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // setConfiguration( value: object|null ): void {

            //     this.configuration = { ... value } as object;

            // },
            // setInitialized( value?: boolean ): void {

            //     this.isInitialized = !! value;

            // },
            // setSession( value?: object ): void {

            //     this.session = { ... value } as cognitoSession;

            // },
            // setToken( value?: string ): void {

            //     this.token = value || '';

            // },
            // setUser( value?: object ): void {

            //     this.user = { ... value } as cognitoUser;

            // },
            // async signInUser(
            //     {
            //         username,
            //         password,
            //         validationData,
            //     }: {
            //         username: string,
            //         password: string,
            //         validationData: object,
            //     }
            // ): Promise<void> {

            //     try {

            //         const userData = await Auth.signIn(
            //             {
            //                 password,
            //                 username,
            //                 validationData,
            //             }
            //         );

            //         if( userData )
            //             this.setUser( userData );

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
            // async signOut(): Promise<void> {

            //     if( ! this.isLoggedIn )
            //         throw new Error( 'User not logged in.' );

            //     this.setUser( {} );
            //     this.setSession( {} );
            //     this.setToken( '' );

            //     try {

            //         await Auth.signOut();

            //     } catch( exception ) {

            //         console.error(
            //             { exception }
            //         );

            //     }

            // },
        },
        getters: {
            // User Session
            isLoggedIn( state ): boolean {

                if( ! state.session?.accessToken?.jwtToken || ! state.session?.accessToken?.payload?.username || ! state.session?.accessToken?.payload?.exp )
                    return false;

                // TODO: Check if i need to transform to a date
                const isActive = new Date( state.session.accessToken.payload.exp * 1000 ).getTime() > Date.now()
                    , isMe = !! state.user.username && state.session.accessToken.payload.username === state.user.username
                ;

                return isActive && isMe;

            },
            // User data
            userAttributes( state ): object {

                return state?.user?.attributes ?? {};

            },
            userGoogleAttributes( state ): object {

                return state?.session?.accessToken?.payload ?? {};

            },
            userGroups( state ): Array<unknown> {

                return state?.session?.accessToken?.payload?.[ 'cognito:groups' ] ?? [];

            },
            userSession( state ): object | cognitoSession {

                return Object.keys( state.session || {} ).length
                    ? state.session
                    : {}
                ;

            },
            userSub( state ): object | cognitoUser | null {

                if( ! state.user )
                    return {};

                if( state.user.attributes )
                    return state.user.attributes.sub;

                if( state.user.userSub )
                    return state.user.userSub;

                return {};

            },
            username( state ): string | null {

                return state?.user?.username ?? null;

            },
        },
        state: () => (
            {
                $initialized: false,
                $intervalId: undefined as number | undefined,
                configuration: {} as object,
                isInitialized: false as boolean,
                session: {
                    accessToken: {
                        jwtToken: '',
                        payload: {
                            'cognito:groups': [],
                            exp: 0,
                            username: null,
                        },
                    },
                    getIdToken: null,
                } as cognitoSession,
                token: '' as string|null,
                user: {
                    attributes: { sub: {} },
                    userSub: {},
                    username: null,
                } as cognitoUser,
            }
        ),
    }
);

// Exports
export { useCognitoStore };
export default useCognitoStore;

if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useCognitoStore, import.meta.hot ) );
