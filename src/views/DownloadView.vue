<template>
  <div id="app">
    <header>
      <div class="logo">
        <router-link to="/"><span style="font-family: 'Google Sans Code', monospace;">&lt;Fenrir /&gt;</span></router-link>
      </div>
      <nav>
        <a href="/docs">Docs</a>
      </nav>
      <a href="/download" class="download-btn">Download</a>
    </header>

    <main>
      <h1>Start Using Fenrir.</h1>

      <p class="subtitle">
        Download Fenrir for your platform.<br>
        Fenrir is available for macOS, Windows, and Linux.
      </p>

      <div class="download-buttons">
        <a 
          v-for="(platform, index) in platforms" 
          :key="index"
          :href="platform.url"
          class="platform-btn"
        >
          <img :src="platform.image" :alt="platform.text" class="platform-icon">
          {{ platform.text }}
        </a>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'FenrirDownload',
  data() {
    return {
      platforms: [
        {
          text: 'Download for macOS',
          image: require('../assets/images/apple.png'),
          url: 'https://www.mediafire.com/file/bto581sbztj2g41/Fenrir-Runtime.dmg/file'
        },
        {
          text: 'Download for Windows',
          image: require('../assets/images/win.png'),
          url: 'https://www.mediafire.com/file/kpwc5qqx1thwict/FenrirWindows.exe/file'
        },
        {
          text: 'Download for Linux',
          image: require('../assets/images/linux.png'),
          url: 'https://www.mediafire.com/file/elsyvsm3unhrfnj/Fenrir.zip/file'
        }
      ]
    }
  }
}
</script>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
    color: white; text-decoration: none;
    
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #1a1a1a;
  color: #ffffff;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
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

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: calc(100vh - 80px);
}

.app-icon {
  width: 150px;
  height: 150px;
  background-color: #d4c5b0;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.icon-circles {
  position: relative;
  width: 100px;
  height: 100px;
}

.circle {
  position: absolute;
  border: 3px solid #ff6b4a;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.circle-1 {
  width: 100px;
  height: 100px;
}

.circle-2 {
  width: 70px;
  height: 70px;
}

.circle-3 {
  width: 40px;
  height: 40px;
}

.circle-center {
  width: 20px;
  height: 20px;
  background-color: #ff6b4a;
  border: none;
}

h1 {
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.1rem;
  color: #b0b0b0;
  max-width: 700px;
  line-height: 1.7;
  margin-bottom: 3rem;
  font-weight: 400;
}

.download-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.platform-btn {
  background-color: #d4c5b0;
  color: #1a1a1a;
  padding: 1.2rem 2.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 250px;
  justify-content: center;
}

.platform-btn:hover {
  background-color: #c4b5a0;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(212, 197, 176, 0.3);
}

.platform-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

footer {
  background-color: #0f0f0f;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #2a2a2a;
  margin-top: auto;
}

footer p {
  color: #808080;
  font-size: 1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  header {
    padding: 1rem 1.5rem;
  }

  .download-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .platform-btn {
    width: 100%;
  }

  .app-icon {
    width: 120px;
    height: 120px;
  }

  .icon-circles {
    width: 80px;
    height: 80px;
  }

  .circle-1 {
    width: 80px;
    height: 80px;
  }

  .circle-2 {
    width: 55px;
    height: 55px;
  }

  .circle-3 {
    width: 30px;
    height: 30px;
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
