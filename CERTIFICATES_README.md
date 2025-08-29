# Certificates Section - Setup Guide

## Overview
Your portfolio now includes a fully functional certificates section that displays your professional certifications with PDF viewing capabilities.

## File Structure
```
Portfolio/
├── certificates/           # Create this folder for your PDF files
│   ├── ros2-certificate.pdf
│   ├── python-certificate.pdf
│   └── pneumatic-certificate.pdf
├── data.json              # Certificate data configuration
├── styles.css             # Certificate styling
└── script.js              # Certificate functionality
```

## Adding New Certificates

### Step 1: Add Certificate Data
Edit `data.json` and add your certificate to the `certifications` array:

```json
{
  "title": "Your Certificate Name",
  "issuer": "Issuing Organization",
  "date": "2024",
  "description": "Brief description of what this certificate covers",
  "pdfUrl": "certificates/your-certificate.pdf",
  "icon": "fas fa-certificate",
  "skills": ["Skill1", "Skill2", "Skill3"]
}
```

### Step 2: Add PDF File
1. Create a `certificates` folder in your portfolio directory
2. Save your PDF file with a descriptive name (e.g., `aws-cloud-practitioner.pdf`)
3. Update the `pdfUrl` in data.json to match your file name

### Step 3: Choose an Icon
Select an appropriate FontAwesome icon for your certificate:
- `fas fa-robot` - Robotics/AI certificates
- `fab fa-python` - Python programming
- `fas fa-cloud` - Cloud computing
- `fas fa-database` - Database certifications
- `fas fa-shield-alt` - Security certificates
- `fas fa-cogs` - Engineering/Technical
- `fas fa-certificate` - General certificates

## Features

### PDF Viewing
- **In-browser viewing**: Click "View Certificate" to open PDFs in a modal
- **Download option**: Click "Download PDF" to save certificates locally
- **Error handling**: Graceful fallback if PDF files are missing
- **Loading states**: Visual feedback while PDFs load

### Responsive Design
- **Desktop**: Grid layout with hover effects
- **Tablet**: Responsive grid that adapts to screen size
- **Mobile**: Single column layout with full-width buttons

### Styling
- **Robotics theme**: Matches your portfolio's cyan/orange color scheme
- **Animated effects**: Hover animations and glowing elements
- **Skill badges**: Visual tags for certificate-related skills
- **Professional layout**: Clean, modern certificate cards

## Customization

### Colors
To change certificate colors, edit these CSS variables in `styles.css`:
- Primary color: `#00ffff` (cyan)
- Secondary color: `#ff7730` (orange)
- Background: `rgba(22, 33, 62, 0.9)`

### Card Layout
Modify `.certificate-card` class in `styles.css` to adjust:
- Padding and margins
- Border radius
- Shadow effects
- Animation timing

### Modal Behavior
Customize PDF modal in `script.js`:
- Modal size and positioning
- Loading animations
- Error messages
- Keyboard shortcuts

## Troubleshooting

### PDF Not Loading
1. Check file path in `data.json` matches actual file location
2. Ensure PDF file is in the `certificates` folder
3. Verify file name spelling and extension
4. Check browser console for error messages

### Styling Issues
1. Clear browser cache and refresh
2. Check CSS file for syntax errors
3. Verify FontAwesome icons are loading
4. Test on different screen sizes

### Mobile Issues
1. Test touch interactions on actual devices
2. Check modal sizing on small screens
3. Verify button accessibility
4. Test PDF viewing on mobile browsers

## Best Practices

### PDF Files
- **File size**: Keep PDFs under 5MB for faster loading
- **File names**: Use descriptive, lowercase names with hyphens
- **Quality**: Ensure PDFs are readable and professional
- **Security**: Don't include sensitive personal information

### Data Management
- **Consistent formatting**: Use similar date formats (e.g., "2024" or "Jan 2024")
- **Accurate information**: Double-check issuer names and dates
- **Relevant skills**: Only include skills directly related to the certificate
- **Professional descriptions**: Keep descriptions concise and professional

## Example Certificate Entry

```json
{
  "title": "AWS Certified Cloud Practitioner",
  "issuer": "Amazon Web Services",
  "date": "March 2024",
  "description": "Foundational understanding of AWS Cloud services, security, architecture, pricing, and support",
  "pdfUrl": "certificates/aws-cloud-practitioner.pdf",
  "icon": "fab fa-aws",
  "skills": ["AWS", "Cloud Computing", "Cloud Architecture", "Security"]
}
```

## Support
If you encounter any issues:
1. Check the browser console for error messages
2. Verify all file paths are correct
3. Test with a simple PDF first
4. Ensure your web server can serve PDF files

Your certificates section is now ready to showcase your professional achievements with a modern, interactive interface!
