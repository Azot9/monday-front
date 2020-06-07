<template>
  <div class="laboratories_page">
    <div class="my-12 px-8">
      <v-data-table :headers="headers" :items="details" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Всі Деталі</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Нова Деталь</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="Назва"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox v-model="editedItem.working_status" label="Справність "></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.stand_id" label="Ідентифікатор Стенда"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.delivery_id"
                          label="Ідентифікатор Поставки"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Відмінити</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Зберегти</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
        <template v-slot:item.working_status="{ item }">
          <v-icon color="green darken-2" v-if="item.working_status">done</v-icon>
          <v-icon color="red darken-2" v-else>clear</v-icon>
        </template>
        <template v-slot:item.detail_time="{ item }">
          <p color="green darken-2" v-if="item.detail_time">{{item.detail_time}}</p>
          <p v-else>Необмежений</p>
        </template>
      </v-data-table>
    </div>

    <v-container class="my-10 px-0" >
      <v-text-field max-width="300px" v-model="api_link" label="API посилання"></v-text-field>
    </v-container>
    <StandChart />
  </div>
</template>


<script>
import StandChart from "../components/StandChart";
export default {
  components: {
    StandChart
  },
  name: "DetailsPage",
  data: () => ({
    dialog: false,
    api_link: "",
    headers: [
      {
        text: "Назва",
        align: "start",
        value: "name"
      },
      { text: "Справність", value: "working_status" },
      { text: "Термін придатності", value: "detail_time" },
      { text: "Ідентифікатор Поставки", value: "delivery_id" },
      { text: "", value: "actions" }
    ],
    details: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      working_status: false,
      stand_id: 0,
      delivery_id: 0
    },
    defaultItem: {
      name: "",
      working_status: false,
      stand_id: 0,
      delivery_id: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Нова Деталь" : "Редагувати деталь";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.details = [
        {
          name: "Датчик світла",
          working_status: true,
          delivery_id: "delivery_1"
        },
        {
          name: "Датчик тепла",
          working_status: false,
          detail_time: "05-05-2020",
          delivery_id: "delivery_2"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.details.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.details.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.details.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.details[this.editedIndex], this.editedItem);
      } else {
        this.details.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>