# QR Code Generator - CodeCraft

A modern, feature-rich QR code generator built with Next.js, React, TypeScript, and Tailwind CSS.

## ✨ Features

### Core Functionality

- **Instant QR Code Generation**: Generate QR codes from URLs instantly
- **Multiple Export Formats**: Download as PNG, JPEG, or SVG
- **Real-time Preview**: See your QR code as you customize it

### Customization Options

- **Color Customization**: Choose custom colors for QR code and background
- **Size Adjustment**: Adjust QR code size from 200px to 600px
- **Error Correction Levels**: Select from Low (7%), Medium (15%), Quartile (25%), or High (30%) error correction

### User Experience

- **Input Validation**: Real-time URL validation with helpful error messages
- **Toast Notifications**: Success and error feedback for all actions
- **Copy to Clipboard**: One-click URL copying
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Accessibility**: ARIA labels and keyboard navigation support

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Modern React**: Built with React 19 and Next.js 15
- **Tailwind CSS**: Beautiful, responsive design system
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd qr-code-generator
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Usage

1. **Enter a URL**: Type or paste a valid URL in the input field
2. **Customize (Optional)**: Click "Show Customization Options" to adjust:
   - QR code size
   - Error correction level
   - QR code color
   - Background color
3. **Generate**: Click "Generate" or press Enter
4. **Download**: Choose your preferred format and download the QR code
5. **Copy URL**: Use the copy button to copy the URL to clipboard

## 🎨 Customization

The application supports extensive customization:

### Colors

- **QR Code Color**: Choose any color for the QR code pattern
- **Background Color**: Select any background color

### Size

- **Range**: 200px to 600px
- **Responsive**: Automatically scales for different screen sizes

### Error Correction

- **Low (L)**: 7% - Smallest QR codes, less damage tolerance
- **Medium (M)**: 15% - Good balance of size and reliability
- **Quartile (Q)**: 25% - Better damage tolerance
- **High (H)**: 30% - Maximum damage tolerance, largest codes

## 🔧 Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **QR Generation**: qrcode library
- **Icons**: Heroicons (SVG)
- **Fonts**: Geist Sans and Geist Mono

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main QR generator component
│   └── globals.css         # Global styles
├── components/
│   └── Toast.tsx           # Toast notification component
└── ...
```

## 🎯 Future Enhancements

- [ ] Logo overlay support
- [ ] QR code scanning functionality
- [ ] Batch QR code generation
- [ ] QR code analytics/tracking
- [ ] Template presets
- [ ] History of generated QR codes
- [ ] Social media sharing
- [ ] Dark mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [qrcode](https://github.com/soldair/node-qrcode) library for QR code generation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
