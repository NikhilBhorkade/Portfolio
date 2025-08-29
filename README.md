# Personal Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, JavaScript, and JSON for dynamic content management.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Content**: All content is loaded from a JSON file for easy customization
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, mobile navigation, contact form
- **Performance Optimized**: Fast loading with efficient code structure

## File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── data.json           # Portfolio content and data
└── README.md           # This file
```

## Customization

### 1. Personal Information
Edit `data.json` to update your personal information:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Job Title",
    "description": "Your description",
    "email": "your.email@example.com",
    "phone": "your-phone-number",
    "location": "Your Location"
  }
}
```

### 2. Skills
Add or modify skills in the `skills` array:

```json
{
  "name": "Skill Name",
  "icon": "fas fa-icon-name",
  "description": "Skill description"
}
```

### 3. Projects
Update the `projects` array with your work:

```json
{
  "title": "Project Title",
  "description": "Project description",
  "image": "fas fa-icon-name",
  "technologies": ["Tech1", "Tech2"],
  "liveUrl": "https://your-project.com",
  "githubUrl": "https://github.com/username/repo"
}
```

### 4. Social Links
Modify the `socialLinks` array:

```json
{
  "platform": "Platform Name",
  "url": "https://platform.com/username",
  "icon": "fab fa-platform-icon"
}
```

## Icons

This portfolio uses Font Awesome icons. You can find icons at:
- https://fontawesome.com/icons

Common icon classes:
- `fas fa-code` - Code icon
- `fas fa-server` - Server icon
- `fab fa-github` - GitHub icon
- `fab fa-linkedin` - LinkedIn icon

## Colors

The portfolio uses a modern color scheme:
- Primary: `#667eea` (Blue gradient start)
- Secondary: `#764ba2` (Purple gradient end)
- Accent: `#ffd700` (Gold highlight)
- Text: `#333` (Dark gray)
- Background: `#f8f9fa` (Light gray)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

1. **Customize Content**: Edit `data.json` with your information
2. **Add Your Photo**: Replace the profile icon with your photo (optional)
3. **Update Links**: Add your actual project and social media links
4. **Test Locally**: Open `index.html` in a web browser
5. **Deploy**: Upload files to your web hosting service

## Local Development

To run locally:
1. Open `index.html` in a web browser, or
2. Use a local server (recommended for JSON loading):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## Deployment Options

- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Drag and drop deployment
- **Vercel**: Easy deployment with Git integration
- **Traditional Web Hosting**: Upload files via FTP

## Customization Tips

1. **Colors**: Modify CSS custom properties in `styles.css`
2. **Fonts**: Change font families in the CSS
3. **Layout**: Adjust grid layouts and spacing
4. **Animations**: Modify transition durations and effects
5. **Sections**: Add or remove sections as needed

## Contact Form

The contact form includes basic validation. To make it functional:
1. Add a backend service (Node.js, PHP, etc.)
2. Use a service like Formspree or Netlify Forms
3. Integrate with email services

## Performance Tips

- Optimize images before adding them
- Minify CSS and JavaScript for production
- Use a CDN for Font Awesome icons
- Enable gzip compression on your server

## License

This project is open source and available under the MIT License.

## Support

If you need help customizing your portfolio, feel free to reach out or check the documentation for each technology used.
