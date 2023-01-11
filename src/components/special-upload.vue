<script setup lang="ts">
import { ref, inject } from "vue";

const props = defineProps<{
  customImg?: string;
}>();

const img = inject("specialUploadImage") as string;
const imgVal = img ?? props.customImg;

const imgSRC = ref(imgVal);
function fileUpload(event: Event): void {
  const target = event.target as HTMLInputElement;
  const file = target.files[0];
  fileProcess(file);
}

function fileProcess(file: File) {
  imgSRC.value = URL.createObjectURL(file);
}
</script>
<template>
  <div class="image-uploader">
    <h1>File Uploader</h1>
    <input
      @change="fileUpload"
      type="file"
      id="file-upload"
      name="fileUpload"
      accept="image/*"
    />
    <div class="your-file">
      <img :src="imgSRC" alt="" srcset="" />
    </div>
  </div>
</template>
<style>
.image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  width: 50%;
  background-color: eggshell;
  height: 300px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.your-file {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

img {
  width: 70%;
  max-height: 200px;
}
</style>
