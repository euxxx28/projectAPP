<template>
  <div>
    <h1>💌 Secret Compliment Wall</h1>
    <input v-model="name" placeholder="Your name (optional)" />
    <textarea v-model="message" placeholder="Write something nice..."></textarea>
    <button @click="postCompliment">Post a Compliment</button>

    <div v-if="compliments.length === 0">No compliments yet. Be the first!</div>

    <div v-for="c in compliments" :key="c.id" class="compliment">
      <p>"{{ c.message }}"</p>
      <p>— {{ c.name }} <small>({{ c.time }})</small></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";

const compliments = ref([]);
const name = ref("");
const message = ref("");

const fetchCompliments = async () => {
  const res = await fetch("https://projectapp-oudc.onrender.com");
  compliments.value = await res.json();
};

const postCompliment = async () => {
  if (!message.value.trim()) return;

  const newC = {
    id: uuidv4(),
    name: name.value || "Anonymous",
    message: message.value,
    time: new Date().toLocaleString(),
  };

  await fetch("https://projectapp-oudc.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newC),
  });

  compliments.value.unshift(newC);
  name.value = "";
  message.value = "";
};

onMounted(fetchCompliments);
</script>

<style scoped>
input, textarea {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
button {
  background: pink;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}
.compliment {
  background: #ffe4e1;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
