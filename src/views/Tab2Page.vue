<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bookshelf</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>


          <!-- <ion-card v-for="(item, index) in bookList" :key="index">
            <ion-card-header>
              <ion-card-title>{{ item.title }}</ion-card-title>
              <ion-card-subtitle>{{ item.author }}</ion-card-subtitle>
            </ion-card-header>
        
            <ion-card-content>
              <ion-button slot="end" fill="clear" @click="updateOperation(item, index)">
                <ion-icon aria-hidden="true" :icon="informationCircle" />
               </ion-button>
            </ion-card-content>
          </ion-card> -->
          <ion-card class="my-card book-card" v-for="(book, index) in bookList" :key="index">
            <!-- Top Section -->
            <ion-card-header>
              <ion-card-title :class="{'text-white': true, 'top-card': true, 'completed': parseInt(book.length, 10) <= parseInt(book.pagesRead, 10)}">
                <div class="row">
                  <div class="col-10">
                    <ion-list>
                      <ion-item>
                        <ion-label>{{ book.title }}</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-label>By {{ book.author }}</ion-label>
                      </ion-item>

                      
                    </ion-list>
          
                  </div>
                  <!-- <div class="col-2">
                    <ion-progress-bar
                      *ngIf="parseInt(book.length, 10) >= parseInt(book.pagesRead, 10)"
                      [value]="Math.round((book.pagesRead / book.length) * 100)"
                      color="success"
                    ></ion-progress-bar>
                  </div> -->
                </div>
              </ion-card-title>
            </ion-card-header>
        
            <!-- Card Actions -->
            <ion-card-actions>
              <ion-button slot="end" fill="clear" @click="updateOperation(book, index)">
                <ion-icon aria-hidden="true" :icon="informationCircle" />
               </ion-button>
               <ion-button fill="clear" slot="end" color="danger" @click="deleteOperation(book, index)">
                <ion-icon aria-hidden="true" :icon="trashBin" />
            </ion-button>
            </ion-card-actions>
          </ion-card>
           
           
           

      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,} from '@ionic/vue';
import { informationCircle, trashBin } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import firebaseService from '../firebase-service';


export default defineComponent({
  data() {
      return  { bookList: [] }
  },
  name: 'ReadLibrary',
  setup() {
    const router = useRouter();
      return {router, informationCircle, trashBin};
  },
  created() {
    const bookList = firebaseService().readOperation('Library', (data: any) => {
        this.bookList = data;
    });

    console.log(bookList)
    
 
  },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  },
  methods: {
    async updateOperation(item: any, index: any) {
      const data: any = await firebaseService().findIdForDoc('Library', item.title);
      console.log('Data', data);
      
      this.$router.push({name: 'Details', params: {id: data.title}})
    },
    deleteOperation(item: any) {
            const answer = window.confirm('Are you sure you would like to delete this item')
            console.log(answer);

            if (answer) {
                firebaseService().deleteOperation('Library', item.title);
                console.log("deleted");
                this.router.push('/tab2');
            }

        }

  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
