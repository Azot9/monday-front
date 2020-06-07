<template>
  <div class="details_page">
    <!-- <v-app id="inspire"> -->
    <div class="my-12 px-8">
      <v-data-table :headers="headers" :items="details" class="elevation-1">
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
                        <!-- <v-text-field v-model="editedItem.stand_id" label="Ідентифікатор Стенда"></v-text-field> -->
                        <v-select
                          :items="getStandsId"
                          v-model="editedItem.stand_id"
                          label="Ідентифікатор Стенда"
                        ></v-select>
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
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        </template>
        <template v-slot:item.working_status="{ item }">
          <v-icon color="green darken-2" v-if="item.working_status">done</v-icon>
          <v-icon color="red darken-2" v-else>clear</v-icon>
        </template>
      </v-data-table>
    </div>
    <!-- </v-app> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "DetailsPage",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Назва",
        align: "start",
        value: "name"
      },
      { text: "Справність", value: "working_status" },
      { text: "Ідентифікатор Стенда", value: "stand_id" },
      { text: "Ідентифікатор Поставки", value: "delivery_id" },
      { text: "", value: "actions" }
    ],
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
    },
    stands: [1, 2, 3]
  }),
  created() {
    setTimeout(() => {
      console.log(this.details);
    }, 3000);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState(["details"]),
    ...mapGetters(["getStandsId"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.details.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.details.indexOf(item);
      if (confirm("Ви справді хочете видалити цей елемент?")) {
        this.$store.dispatch("deleteDetail", item.id);
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      this.$store.dispatch("createDetail", this.editedItem);
      this.close();
    }
  }
};
</script>

<style>
</style>