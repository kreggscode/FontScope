# 🎨 FontScope - Font Identifier Chrome Extension

<div align="center">

![FontScope Logo](https://img.shields.io/badge/FontScope-Font%20Identifier-blue?style=for-the-badge&logo=google-chrome&logoColor=white)
![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-green?style=for-the-badge&logo=google-chrome&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=for-the-badge&logo=github&logoColor=white)

**Discover fonts on any web page with stunning precision and elegance**

[🚀 Install from Chrome Web Store](https://chromewebstore.google.com/detail/fontscope/plfjilblodndpfjnnlmfolfmnmhkhblg?authuser=0&hl=en) | [🌐 Live Demo](https://kreggscode.github.io/FontScope/) | [📖 Documentation](#features)

![FontScope Preview](https://via.placeholder.com/800x400/6366F1/FFFFFF?text=FontScope+Preview)

</div>

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🎯 **Precise Detection** | Hover over any text to instantly reveal font families, sizes, weights, and colors |
| 🎨 **Visual Excellence** | Glassmorphic tooltips with gradient backgrounds and smooth animations |
| 📱 **Smart Positioning** | Automatically positions tooltips above/below text based on available space |
| 🚀 **Lightning Fast** | No performance impact on web pages - lightweight and efficient |
| 🔒 **Privacy First** | Only reads CSS properties locally - no data collection or transmission |
| 🌐 **Cross-Platform** | Compatible with all modern browsers supporting Chrome extensions |

</div>

## 🚀 Quick Start

### Installation

1. **From Chrome Web Store** (Recommended)
   - Visit [Chrome Web Store](https://chromewebstore.google.com/detail/fontscope/plfjilblodndpfjnnlmfolfmnmhkhblg?authuser=0&hl=en)
   - Click "Add to Chrome"
   - Pin the extension for easy access

2. **Manual Installation** (For Development)
   - Download the extension files
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension folder

### Usage

1. **Navigate** to any web page
2. **Hover** over text elements
3. **View** the floating tooltip with complete font information
4. **Enjoy** the premium visual experience!

## 🛠️ Tech Stack

<div align="center">

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Browser Extension
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow?style=for-the-badge&logo=google-chrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue?style=for-the-badge)

### Development Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=for-the-badge&logo=github&logoColor=white)

</div>

## 📸 Screenshots

<div align="center">

### Font Detection in Action
<img src="https://via.placeholder.com/400x300/6366F1/FFFFFF?text=Font+Detection" alt="Font Detection" width="400">

### Premium UI Design
<img src="https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Premium+UI" alt="Premium UI" width="400">

### Smart Positioning
<img src="https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Smart+Positioning" alt="Smart Positioning" width="400">

</div>

## 🎨 Design System

- **Primary Colors**: Indigo (#6366F1) → Purple (#8B5CF6) → Pink (#EC4899)
- **Typography**: System fonts with monospace for font names
- **Effects**: Glassmorphism, gradients, and smooth animations
- **Spacing**: Consistent 20-24dp rounded corners and padding

## 🔧 Development

### Project Structure
```
FontScope/
├── manifest.json          # Extension manifest
├── content.js            # Font detection logic
├── content.css           # Tooltip styling
├── popup.html            # Extension popup
├── popup.js              # Popup functionality
├── popup.css             # Popup styling
├── docs/                 # GitHub Pages website
│   ├── landing.html      # Main website
│   ├── privacy.html      # Privacy policy
│   ├── terms.html        # Terms of service
│   └── icon-generator.html # Icon generator tool
└── README.md             # This file
```

### Building for Production

```bash
# Create production zip (exclude docs folder)
zip -r FontScope.zip . -x "docs/*" "*.git*"
```

### Local Development

1. Clone the repository
2. Open `chrome://extensions/`
3. Enable Developer mode
4. Load unpacked extension
5. Make changes and reload

## 🌟 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow the existing code style
- Test on multiple websites
- Ensure cross-browser compatibility
- Add screenshots for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for designers and developers
- Inspired by the need for better font identification tools
- Special thanks to the open-source community

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/kreggscode/FontScope/issues)
- **Email**: kreg9da@gmail.com
- **Website**: [FontScope Official Site](https://kreggscode.github.io/FontScope/)

---

<div align="center">

**Made with ❤️ by [kreggscode](https://github.com/kreggscode)**

⭐ Star this repo if you find it helpful!

[⬆️ Back to Top](#-fontscope---font-identifier-chrome-extension)

</div>
