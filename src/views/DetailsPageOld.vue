<template>
  <div class="laboratories_page">
    <div class="my-12 px-8">
      <v-data-table
        :search="searching"
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.name="{ item }">
          <router-link
            :to="`/details/${item.slug}`"
            tag="p"
            class="link_to_one_details"
          >{{item.name}}</router-link>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsPage",
  data() {
    return {
      searching: "",
      headers: [
        {
          text: "Назва",
          align: "start",
          value: "name"
        },
        { text: "Кількість", value: "count" },
        { text: "Кількість справних", value: "working_count" }
      ],
      desserts: [
        {
          name: "Датчики тепла",
          count: 159,
          working_count: 2,
          slug: "qwe"
        },
        {
          name: "Датчики світла",
          count: 159,
          working_count: 5,

          slug: "qweqw"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.link_to_one_details {
  cursor: pointer;
}
</style>