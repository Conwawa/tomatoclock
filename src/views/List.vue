<template>
  <div class="background" style="background:#FFFDE7;height: 100vh;">
    <VContainer>
      <VRow>
        <VCol cols="12"></VCol>
        <VCol cols="12">
          <h1 style="color: #757575 ">List</h1>
        </VCol>
        <VCol cols="12">
          <VTextField v-model="newItem" label="ADD NEW ITEM" append-inner-icon="mdi-plus"
            @click:append-inner="onInputSubmit" @keydown.enter="onInputSubmit" :rules="[rules.required, rules.length]"
            ref="newItemInput">

          </VTextField>
          <VTable>
            <thead>
              <tr>
                <th>名稱</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in items" :key="item.id">
                <td>

                  <VTextField v-model="item.model" :rules="[rules.required, rules.length]" autofocus ref="editItemInput"
                    @keydown.enter="onEditInputSubmit(item.id, i)" v-show="item.edit"></VTextField>

                  <span v-show="!item.edit">
                    {{ item.name }}
                  </span>
                </td>
                <td>
                  <template v-if="item.edit">
                    <VBtn icon="mdi-check" variant="text" color="#7CB342" @click="onEditInputSubmit(item.id, i)"></VBtn>
                    <VBtn icon="mdi-undo" variant="text" color="#8D6E63" @click="cancelEditItem(item.id)"></VBtn>
                  </template>
                  <template v-else>
                    <VBtn icon="mdi-pencil" variant="text" color="#7CB342" @click="editItem(item.id)"></VBtn>
                    <VBtn icon="mdi-trash-can" variant="text" color="#8D6E63" @click="delItem(item.id)"></VBtn>
                  </template>
                </td>
              </tr>
              <tr v-if="items.length === 0">
                <td colspan="2" class="text-center" style="color: #FB8C00;font-weight: bold;border: 1px solid #FFEE58;">
                  EMPTY</td>
              </tr>
            </tbody>
          </VTable>
        </VCol>
        <VCol cols="12">
          <h1 style="color: #757575 ">Done Items</h1>
        </VCol>
        <VCol cols="12">
          <VTable>
            <thead>
              <tr>
                <th>名稱</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in finishedItems" :key="item.id">
                <td>{{ item.name }}</td>
                <td>
                  <VBtn icon="mdi-trash-can" variant="text" color="#8D6E63" @click="delFinishedItem(item.id)"></VBtn>
                </td>
              </tr>
              <tr v-if="finishedItems.length === 0">
                <td colspan="2" class="text-center" style="color: #FB8C00;font-weight: bold;border: 1px solid #FFEE58;">
                  EMPTY</td>
              </tr>
            </tbody>
          </VTable>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup >
import { ref } from 'vue'
import { useListStore } from '@/store/list'
import { storeToRefs } from 'pinia'

const list = useListStore()
const { addItem, editItem, cancelEditItem, delItem, confirmEditItem, delFinishedItem } = list
const { items, finishedItems } = storeToRefs(list)

const newItem = ref('')
const newItemInput = ref(null)
const editItemInput = ref([])

const onInputSubmit = async () => {
  const validate = await newItemInput.value.validate()
  console.log(validate)
  if (validate.length > 0) return
  addItem(newItem.value)
  newItemInput.value.blur()
  newItemInput.value.reset()
}

const onEditInputSubmit = async (id, i) => {
  const validate = await editItemInput.value[i].validate()
  console.log(validate)
  if (validate.length > 0) return
  confirmEditItem(id)
}

const rules = {
  required: (value) => Boolean(value) || '欄位必填',
  length: (value) => value.length >= 3 || 'At Least 3 Letters'
}
</script>
