<template>
  <div>
    <DataTable dataKey="_id" v-bind:value="skeletonTable">
      <Column header="Imie i nazwisko" headerStyle="width:15%">
        <template #body>
          <Skeleton  height="35px"></Skeleton>
        </template>
      </Column>

      <Column header="Absencje">
        <template #body>
          <Skeleton  height="35px"></Skeleton>
        </template>
      </Column>

      <Column bodyStyle="text-align:center" headerStyle="width:4rem">
        <template #body>
          <Skeleton  height="35px"></Skeleton>
        </template>
      </Column>
    </DataTable>
    <Skeleton height="35px" width="100px" style="float: right; margin-top: 10px"></Skeleton>
    <div class="clear-both"></div>
  </div>

</template>

<script>
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import Skeleton from "primevue/components/skeleton/Skeleton";

export default {
  name: "SkeletonTable",

  components:{
    DataTable,
    Column,
    Skeleton
  },

  data(){
    return{
      skeletonTable: [
        { _id: '1', col1: '', col2: ''},
        { _id: '2', col1: '', col2: ''},
        { _id: '3', col1: '', col2: ''},
        { _id: '4', col1: '', col2: ''}
      ]
    }
  }
}
</script>

<style scoped>

</style>