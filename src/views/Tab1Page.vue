<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Add Book</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-row>
        <ion-col>
          <ion-input type="text" v-model="title" placeholder="Enter Title" class="input"
            padding-horizontal></ion-input>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-input type="text" v-model="author" placeholder="Enter author" class="input"
            padding-horizontal></ion-input>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-input type="number" v-model="length" placeholder="Enter length" class="input"
            padding-horizontal></ion-input>
        </ion-col>
      </ion-row>
      <!-- <ion-row>
        <ion-col>
          <ion-input type="number" v-model="pagesRead" placeholder="Enter pages read" class="input"
            padding-horizontal></ion-input>
        </ion-col>
      </ion-row> -->
      <ion-row>
        <ion-col>
          <ion-input type="text" v-model="type" placeholder="Enter Type" class="input"
            padding-horizontal></ion-input>
          
            <!-- <ion-select
            aria-label="type"
            placeholder="Enter type"
            v-model="type"
          >
            <ion-select-option v-for="type in types" :key="type" :value="type">{{ type }}</ion-select-option>
          </ion-select> -->
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-input type="text" v-model="language" placeholder="Enter language" class="input"
            padding-horizontal></ion-input>
            <!-- <ion-select 
            v-model="language"
            aria-label="Language"
            placeholder="Enter language">
              <ion-select-option v-for="languageItem in languages" :key="languageItem" :value="languageItem">{{ languageItem }}</ion-select-option>
            </ion-select> -->
        </ion-col>
      </ion-row>


      <div class="container">
        <ion-button @click="createOperation()">Add Book</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonInput, IonRow, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import firebaseService from '../firebase-service';
export default defineComponent({
  data() {

    
    return { title: '', author: '',  length: 0, pagesRead: 0, timePeriod: '', type: '', language: '', 
    types: [
    'Biography',
    'War History',
    'Architecture',
    'Theology',
    'Primary Accounts',
    'Social History',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Self-Help',
    'Cooking',
    'Travel',
    'Poetry',
    'Art',
    
    ],
    languages: [
        'English',
        'Spanish',
        'French',
        'German',
        'Chinese',
        'Japanese',
        'Korean',
        'Arabic',
        'Russian',
        'Portuguese',
        'Italian',
        'Hindi',
        'Bengali',
        'Punjabi',
        'Urdu',
        'Indonesian',
        'Turkish',
        'Thai',
        'Vietnamese',
        'Dutch',
        'Swedish',
        'Greek',
        'Hebrew',
        'Polish',
        'Czech',
        'Hungarian',
        'Finnish',
        'Latin',
        
        // Add more languages as needed
      ]}
  },
  name: 'CreateBook',
  setup() {
    const router = useRouter();
    return { router };
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
    async createOperation() {
      const bookObject = {
        title: this.title,
        author: this.author,
        length: this.length,
        pagesRead: this.pagesRead,
        timePeriod: this.timePeriod,
        type: this.type,
        language: this.language

      }
      console.log('Data', this.title, this.author);
      const bookData = await firebaseService().createOperation('Library', bookObject);
      console.log(bookData);

      this.title = '';
      this.author = '';
      this.length = 0;
      this.pagesRead = 0;
      this.timePeriod = '';
      this.type = '';
      this.language = '';
    },
    getOperation() {
      this.router.push('/tab2');
    }
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