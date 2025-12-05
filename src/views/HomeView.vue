<template>
  <div id="app">
    <header>
      <title>Fenrir Runtime</title>
      <div class="logo">
        <router-link to="/"><span style="font-family: 'Google Sans Code', monospace;">&lt;Fenrir /&gt;</span></router-link>
      </div>
      <nav>
        <a href="/docs">Docs</a>
        <a href="https://github.com/yigitkabak/Fenrir">Github</a>
      </nav>
      <a href="/download" class="download-btn">Download</a>
    </header>

    <section class="hero">
      <div class="hero-text">
        <h1>
          <span class="highlight">Fenrir</span> Runtime.
        </h1>
        <p class="subtitle">
          New Generation Runtime, <span class="highlight">Fenrir</span>.
        </p>
        <div class="cta-buttons">
          <a href="/download" class="btn btn-primary">Beta is now available! →</a>
        </div>
        <div class="social-links">
          <a href="https://github.com/yigitkabak/Fenrir" aria-label="GitHub"><i class="fab fa-github"></i></a>
        </div>
      </div>
    </section>

    <section class="features">
      <div 
        v-for="(feature, index) in features" 
        :key="index" 
        class="feature"
      >
        <div class="feature-content">
          <h2>{{ feature.title }} <span class="feature-accent">{{ feature.accent }}</span></h2>
          <p>{{ feature.description }}</p>
        </div>
        <div class="feature-image">
          <i :class="feature.icon"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FenrirRuntime',
  data() {
    return {
      features: [
        {
          title: 'Lightning',
          accent: 'Fast',
          description: 'Experience blazing-fast performance with our optimized runtime engine. Designed from the ground up for speed and efficiency.',
          icon: 'fas fa-bolt'
        },
        {
          title: 'Privacy',
          accent: 'First',
          description: 'Your data belongs to you. The Fenrir System works without requesting any data.',
          icon: 'fas fa-shield-halved'
        },
        {
          title: 'Beautifully',
          accent: 'Crafted',
          description: 'The Fenrir system is designed for convenience and elegance.',
          icon: 'fas fa-palette'
        },
        {
          title: 'Open',
          accent: 'Source',
          description: 'Built by the community, for the community. Fenrirs code is transparent, auditable, and free.',
          icon: 'fas fa-code'
        }
      ]
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Crimson Text', serif;
  background-color: #1a1a1a;
  color: #ffffff;
  overflow-x: hidden;
}

a {
  color: white; text-decoration: none;
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

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.hero-text {
  max-width: 1200px;
}

h1 {
  font-family: 'Crimson Text', serif;
  font-size: 6rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 2rem;
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
  margin-bottom: 3rem;
  font-weight: 400;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #d4c5b0;
  color: #1a1a1a;
}

.btn-primary:hover {
  background-color: #c4b5a0;
}

.btn-secondary {
  background-color: #2a2a2a;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #3a3a3a;
}

.social-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.social-links a {
  color: #808080;
  font-size: 1.5rem;
  transition: color 0.3s;
  text-decoration: none;
}

.social-links a:hover {
  color: #ff6b4a;
}

.features {
  padding: 6rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 8rem;
}

.feature:nth-child(even) {
  direction: rtl;
}

.feature:nth-child(even) > * {
  direction: ltr;
}

.feature-content h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-weight: 400;
}

.feature-content p {
  font-size: 1.2rem;
  color: #b0b0b0;
  line-height: 1.8;
}

.feature-image {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 1rem;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border: 1px solid #2a2a2a;
}

.feature-image i {
  font-size: 8rem;
  color: #ff6b4a;
  opacity: 0.8;
}

.feature-accent {
  color: #ff6b4a;
  font-style: italic;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }

  header {
    padding: 1rem 1.5rem;
  }

  nav {
    gap: 1rem;
    font-size: 0.9rem;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .feature {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .feature:nth-child(even) {
    direction: ltr;
  }

  .feature-content h2 {
    font-size: 2rem;
  }
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

body {
  margin: 0;
  padding: 0;
}
</style>
