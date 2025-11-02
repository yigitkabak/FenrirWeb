<template>
  <div id="doc-detail-app">
    <header>
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
        <div class="back-link-container">
          <router-link to="/docs" class="back-link">
            <i class="fas fa-arrow-left"></i> Back to Docs
          </router-link>
        </div>

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
          <div v-if="loading" class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading documentation...</p>
          </div>
          
          <div v-else-if="error" class="error-state">
            <i class="fas fa-exclamation-circle"></i>
            <h2>{{ error }}</h2>
            <router-link to="/docs" class="btn-secondary">
              <i class="fas fa-arrow-left"></i> Go back to docs
            </router-link>
          </div>
          
          <div v-else-if="currentDoc" class="doc-content">
            <component :is="currentDoc" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { loadDocsList, loadDocBySlug } from '@/utils/docsLoader';

const route = useRoute();
const searchTerm = ref('');
const docsList = ref([]);
const currentDoc = ref(null);
const loading = ref(true);
const error = ref(null);

const filteredDocs = computed(() => {
  if (!searchTerm.value) {
    return docsList.value;
  }
  
  const term = searchTerm.value.toLowerCase();
  return docsList.value.filter(doc => 
    doc.title.toLowerCase().includes(term)
  );
});

async function loadDoc(slug) {
  loading.value = true;
  error.value = null;
  
  try {
    const doc = await loadDocBySlug(slug);
    if (doc) {
      currentDoc.value = doc;
    } else {
      error.value = 'Document not found';
    }
  } catch (err) {
    error.value = 'Failed to load document';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      loadDoc(newSlug);
    }
  },
  { immediate: true }
);

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

#doc-detail-app {
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

.back-link-container {
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff6b4a;
  font-size: 1rem;
  transition: all 0.3s;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.back-link:hover {
  background-color: #2a2a2a;
  transform: translateX(-4px);
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

/* Main Content */
.docs-main {
  flex: 1;
  margin-left: 280px;
  padding: 3rem;
}

.docs-content {
  max-width: 900px;
  margin: 0 auto;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #b0b0b0;
}

.loading-state i {
  font-size: 3rem;
  color: #ff6b4a;
  margin-bottom: 1rem;
}

.loading-state p {
  font-size: 1.2rem;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.error-state i {
  font-size: 4rem;
  color: #ff6b4a;
  margin-bottom: 1rem;
}

.error-state h2 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 2rem;
  font-weight: 400;
}

.btn-secondary {
  background-color: #2a2a2a;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  background-color: #3a3a3a;
}


.doc-content {
  padding: 2rem 0;
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
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

.doc-content :deep(h1),
.doc-content :deep(h2),
.doc-content :deep(h3),
.doc-content :deep(h4),
.doc-content :deep(h5),
.doc-content :deep(h6) {
  color: #ffffff;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.doc-content :deep(h1) {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2a2a2a;
}

.doc-content :deep(h2) {
  font-size: 2.25rem;
}

.doc-content :deep(h3) {
  font-size: 1.75rem;
}

.doc-content :deep(h4) {
  font-size: 1.5rem;
}

.doc-content :deep(p) {
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.doc-content :deep(code) {
  background-color: #2a2a2a;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
  color: #ff6b4a;
  font-family: 'Courier New', monospace;
}

.doc-content :deep(pre) {
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid #3a3a3a;
}

.doc-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: #d4c5b0;
}

.doc-content :deep(a) {
  color: #ff6b4a;
  text-decoration: underline;
  transition: color 0.3s;
}

.doc-content :deep(a:hover) {
  color: #ff8b6a;
}

.doc-content :deep(ul),
.doc-content :deep(ol) {
  margin-left: 2rem;
  margin-bottom: 1.5rem;
  color: #b0b0b0;
}

.doc-content :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.doc-content :deep(blockquote) {
  border-left: 4px solid #ff6b4a;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: #b0b0b0;
  font-style: italic;
}

.doc-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.doc-content :deep(th),
.doc-content :deep(td) {
  padding: 0.75rem;
  border: 1px solid #2a2a2a;
  text-align: left;
}

.doc-content :deep(th) {
  background-color: #2a2a2a;
  color: #ffffff;
  font-weight: 600;
}

.doc-content :deep(td) {
  color: #b0b0b0;
}

.doc-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.doc-content :deep(hr) {
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 2.5rem 0;
}
</style>
