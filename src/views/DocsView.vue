<template>
  <div id="docs-app">
    <header>
      <title>Documents</title>
      <div class="logo">
        <router-link to="/"><span style="font-family: 'Google Sans Code', monospace;">&lt;Fenrir /&gt;</span></router-link>
      </div>
      <nav>
        <a href="/documentation">Docs</a>
      </nav>
      <a href="/download" class="download-btn">Download</a>
    </header>

    <div class="docs-container">
      <aside class="docs-sidebar">
        <div class="search-container">
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Search Documents..." 
            class="search-input"
          />
        </div>

        <nav class="sidebar-nav">
          <ul class="docs-list">
            <li v-for="doc in filteredDocs" :key="doc.slug" class="doc-item">
              <router-link 
                :to="doc.path"
                class="doc-link"
                active-class="active"
              >
                {{ doc.title }}
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="docs-main">
        <div class="docs-content">
          <div class="docs-hero">
            <h1>Fenrir <span class="highlight">Docs</span></h1>
            <p class="subtitle">
              You can find all documentation files here.
            </p>
          </div>

          <div class="docs-grid">
            <router-link 
              v-for="doc in docsList" 
              :key="doc.slug"
              :to="doc.path"
              class="doc-card"
            >
              <h3>{{ doc.title }}</h3>
              <p>Go to the document →</p>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { loadDocsList } from '@/utils/docsLoader';

const searchTerm = ref('');
const docsList = ref([]);

const filteredDocs = computed(() => {
  if (!searchTerm.value) {
    return docsList.value;
  }
  
  const term = searchTerm.value.toLowerCase();
  return docsList.value.filter(doc => 
    doc.title.toLowerCase().includes(term)
  );
});

onMounted(async () => {
  docsList.value = await loadDocsList();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#docs-app {
  font-family: 'Crimson Text', serif;
  background-color: #1a1a1a;
  color: #ffffff;
  min-height: 100vh;
}

a {
  color: white;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  position: sticky;
  top: 0;
  background-color: #1a1a1a;
  z-index: 1000;
  border-bottom: 1px solid #2a2a2a;
}

nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex: 1;
  justify-content: center;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
  font-weight: 400;
}

nav a:hover {
  color: #ff6b4a;
}

.download-btn {
  background-color: #d4c5b0;
  color: #1a1a1a;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.download-btn:hover {
  background-color: #c4b5a0;
}


.docs-container {
  display: flex;
  min-height: calc(100vh - 80px);
}


.docs-sidebar {
  width: 280px;
  background-color: #1a1a1a;
  border-right: 1px solid #2a2a2a;
  padding: 2rem;
  position: fixed;
  height: calc(100vh - 80px);
  overflow-y: auto;
}

.search-container {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 0.5rem;
  color: #ffffff;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input::placeholder {
  color: #808080;
}

.search-input:focus {
  outline: none;
  border-color: #ff6b4a;
  background-color: #2a2a2a;
}

.sidebar-nav {
  margin-top: 1rem;
}

.docs-list {
  list-style: none;
}

.doc-item {
  margin-bottom: 0.5rem;
}

.doc-link {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #b0b0b0;
  transition: all 0.3s;
  font-size: 1rem;
}

.doc-link:hover {
  background-color: #2a2a2a;
  color: #ffffff;
}

.doc-link.active {
  background-color: #2a2a2a;
  color: #ff6b4a;
  font-weight: 600;
}

.docs-main {
  flex: 1;
  margin-left: 280px;
  padding: 3rem;
}

.docs-content {
  max-width: 1200px;
  margin: 0 auto;
}

.docs-hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.docs-hero h1 {
  font-family: 'Crimson Text', serif;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.highlight {
  color: #ff6b4a;
  font-style: italic;
  font-weight: 400;
}

.subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  line-height: 1.6;
  font-weight: 400;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.doc-card {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border: 1px solid #2a2a2a;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s;
  display: block;
  text-decoration: none;
}

.doc-card:hover {
  border-color: #ff6b4a;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 107, 74, 0.1);
}

.doc-card h3 {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.doc-card p {
  color: #b0b0b0;
  font-size: 1rem;
}


.docs-sidebar::-webkit-scrollbar {
  width: 8px;
}

.docs-sidebar::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.docs-sidebar::-webkit-scrollbar-thumb {
  background: #2a2a2a;
  border-radius: 4px;
}

.docs-sidebar::-webkit-scrollbar-thumb:hover {
  background: #3a3a3a;
}

@media (max-width: 768px) {
  header {
    padding: 1rem 1.5rem;
  }

  nav {
    gap: 1rem;
    font-size: 0.9rem;
  }

  .docs-sidebar {
    display: none;
  }

  .docs-main {
    margin-left: 0;
    padding: 2rem 1.5rem;
  }

  .docs-hero h1 {
    font-size: 2.5rem;
  }

  .docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
</style>
