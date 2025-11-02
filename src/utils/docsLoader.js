export async function loadDocsList() {
  try {
    const context = require.context('@/views/pages', false, /\.vue$/);
    const docsList = [];
    
    context.keys().forEach((key) => {
      const module = context(key);
      
      const fileName = key.replace('./', '').replace('.vue', '');
      
      if (fileName.includes('DocsLayout') || fileName.includes('[slug]')) {
        return;
      }
      
      const title = module.default?.title || module.title || fileName;
      
      docsList.push({
        title,
        slug: fileName,
        path: `/docs/${fileName}`
      });
    });
    
    return docsList.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error loading docs list:', error);
    return [];
  }
}

export async function loadDocBySlug(slug) {
  try {
    const module = await import(`@/views/pages/${slug}.vue`);
    return module.default;
  } catch (error) {
    console.error(`Doc not found: ${slug}`, error);
    return null;
  }
}