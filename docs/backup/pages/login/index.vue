<template>
    <section class="page login">

        <h1>LOGIN</h1>

        <div>

            <br>

            <h3>
                <u>CURRENT AUTHENTICATED USER</u>
            </h3>

        </div>

        <div>

            <br>

            <h3>
                <u>COGNITO STORE</u>
            </h3>

            <p>
                <strong>Cognito:</strong>

                <br>

                <code>
                    isInitialized = {{ isInitialized }}
                </code>
                <br>
                <code>
                    isLoggedIn = {{ isLoggedIn }}
                </code>

                <br>

                <pre v-if="configuration && isInitialized" v-text="configuration" />
                <em v-else>
                    No configuration found.
                </em>
            </p>

            <p>
                <strong>User data:</strong>

                <br>

                <pre v-if="userData && userData.username" v-text="userData" />
                <em v-else>
                    No userData found.
                </em>
            </p>

            <p>
                <strong>Session:</strong>

                <br>

                <pre v-if="session && session.accessToken && session.accessToken.jwtToken" v-text="session" />
                <em v-else>
                    No session found.
                </em>
            </p>

            <p>
                <strong>Token:</strong>

                <br>

                <pre v-if="token" v-text="token" />
                <em v-else>
                    No token found.
                </em>
            </p>

            <p v-if="! isInitialized && ! isLoggedIn">

                <button type="button" @click="refreshUserData()">
                    Refresh user data
                </button>

            </p>
            <p v-else>

                <button type="button" @click="signOut()">
                    Log out
                </button>

            </p>

        </div>

        <br>
        <br>

        <nav>
            <ul>
                <li>
                    <nuxt-link to="/login/sso">
                        ➡️🔐 SSO LOGIN
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/">
                        🏠 GO TO HOMEPAGE
                    </nuxt-link>
                </li>
            </ul>
        </nav>

    </section>
</template>

<script setup lang="ts">

    // Store
    import { storeToRefs } from 'pinia';

    // UseStore
    import { useCognitoStore } from '~/store';

    // Cognito
    const cognitoStore = useCognitoStore()
          , {
              // Actions
              initStoreFetchSessionUserTokenAndCheckFederatedSignIn,
              signOut,
          } = cognitoStore
          , {
              isInitialized,
              isLoggedIn,
              session,
              user: userData,
              configuration,
              token,
          } = storeToRefs( cognitoStore )
    ;

    await initStoreFetchSessionUserTokenAndCheckFederatedSignIn();

    /**
     * Try to auth with Cognito store
     */
    async function refreshUserData(): Promise<void> {

        try {

            // Check if user was already logged-in
            await initStoreFetchSessionUserTokenAndCheckFederatedSignIn();

        } catch( exception ) {

            console.info(
                { exception }
            );

        }

    }

</script>

<style
    lang="scss"
    scoped
    src="./index.scss"
></style>
