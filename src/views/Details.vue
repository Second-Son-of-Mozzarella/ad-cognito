<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <!-- <ion-tab-button tab="tab3" href="/tabs/tab3">
                <ion-icon aria-hidden="true" :icon="backspace" />
              </ion-tab-button> -->
                <ion-title>{{ booksData.title }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <ion-row>
                <ion-col>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>By {{ booksData.author }}</ion-card-title>
                        </ion-card-header>

                        <ion-card-content class="q-pt-none">
                            <ion-list>
                              <ion-item>
                                  <ion-label>Length: </ion-label>
                                  <ion-badge slot="end">{{ booksData.length }}</ion-badge>
                              </ion-item>
                                <ion-item>
                                Language: {{ booksData.language }}
                                 </ion-item>
                                 <ion-item>
                                    Type: {{ booksData.type }}
                                 </ion-item>
                                 <ion-item>
                                    <ion-label> Pages Read: </ion-label>
                                    <ion-badge slot="end"> {{ booksData.pagesRead }}</ion-badge>
                                 </ion-item>
                            </ion-list>
                          </ion-card-content>
                    </ion-card>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col class="ion-text-center">
                    <ion-button fill="clear">
                        <ion-icon aria-hidden="true" :icon="pencil" />
                        <ion-label>Edit Details</ion-label>
                    </ion-button>
                </ion-col>
            </ion-row>





            <!--   
        <div class="container">
          <ion-button @click="updateOperation()">Update Data</ion-button>
        </div> -->


        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonInput, IonRow, IonImg, IonButton, IonRouter, IonCard } from '@ionic/vue';
import { pencil, trashBin } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import firebaseService from '../firebase-service';
export default defineComponent({
    data() {
        return { booksData: {} }
    },
    props: ['id'],
    name: 'UpdateDetails',
    setup() {
        const router = useRouter();
        return { router, trashBin, pencil };
    },
    created() {
        firebaseService().findIdForDoc('Library', this.id).then((book) => {
            this.booksData = book;
        })
    },
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButton,
        IonRow,
        IonCol,
        IonInput
    },
    methods: {
        async updateOperation() {
            // console.log(this.booksData);
            const updated = await firebaseService().updateOperation('Library', this.booksData);
            console.log(updated);
            this.router.push('/tab2');
        },
        
    }
});
</script>

<style scoped>
.container {
    flex: 1;
    display: flex;
    width: 100%;
    justify-content: center;
    align-content: center;
    margin-top: 12px;
}
</style>