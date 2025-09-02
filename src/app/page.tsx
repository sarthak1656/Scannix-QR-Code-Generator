"use client";

import { useState, useRef } from "react";
import QRCode from "qrcode";
import Toast from "@/components/Toast";

interface QRCodeOptions {
  width: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [format, setFormat] = useState("PNG");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [showCustomization, setShowCustomization] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>({
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });
  const [customColors, setCustomColors] = useState({
    dark: "#000000",
    light: "#FFFFFF",
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // URL validation function
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateQRCode = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const options = {
        width: qrOptions.width,
        margin: qrOptions.margin,
        color: customColors,
        errorCorrectionLevel: qrOptions.errorCorrectionLevel,
      };

      const dataUrl = await QRCode.toDataURL(url, options);
      setQrCodeDataUrl(dataUrl);
      setToast({
        message: "QR code generated successfully!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = async () => {
    if (!qrCodeDataUrl) return;

    try {
      let downloadUrl = qrCodeDataUrl;
      let filename = `qr-code.${format.toLowerCase()}`;

      // Handle different formats
      if (format === "SVG") {
        const svgString = await QRCode.toString(url, {
          width: qrOptions.width,
          margin: qrOptions.margin,
          color: customColors,
          errorCorrectionLevel: qrOptions.errorCorrectionLevel,
          type: "svg",
        });
        downloadUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          svgString
        )}`;
      } else if (format === "JPEG" || format === "JPG") {
        const jpegDataUrl = await QRCode.toDataURL(url, {
          width: qrOptions.width,
          margin: qrOptions.margin,
          color: customColors,
          errorCorrectionLevel: qrOptions.errorCorrectionLevel,
          type: "image/jpeg",
        });
        downloadUrl = jpegDataUrl;
        filename = `qr-code.${format === "JPEG" ? "jpeg" : "jpg"}`;
      }

      const link = document.createElement("a");
      link.download = filename;
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
      setError("Failed to download QR code. Please try again.");
    }
  };

  const copyToClipboard = async () => {
    if (!qrCodeDataUrl) return;

    try {
      await navigator.clipboard.writeText(url);
      setToast({
        message: "URL copied to clipboard!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      setToast({
        message: "Failed to copy URL",
        type: "error",
        isVisible: true,
      });
    }
  };

  const resetForm = () => {
    setUrl("");
    setQrCodeDataUrl("");
    setError("");
    setCustomColors({
      dark: "#000000",
      light: "#FFFFFF",
    });
    setQrOptions({
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            {/* Logo and Brand Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Scannix
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-700">
            Enter your URL to instantly generate a QR code.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* URL Input */}
          <div className="mb-8">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Add your URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError(""); // Clear error when user types
                }}
                placeholder="https://example.com"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                onKeyPress={(e) => e.key === "Enter" && generateQRCode()}
                aria-describedby={error ? "url-error" : undefined}
              />
              <button
                onClick={generateQRCode}
                disabled={!url.trim() || isGenerating}
                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
            {error && (
              <p
                id="url-error"
                className="text-red-500 text-sm mt-2"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          {/* Customization Options */}
          <div className="mb-8">
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
            >
              {showCustomization ? "Hide" : "Show"} Customization Options
              <svg
                className={`w-4 h-4 transition-transform ${
                  showCustomization ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showCustomization && (
              <div className="mt-4 p-4 bg-white rounded-lg border space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Size (px)
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="600"
                      step="50"
                      value={qrOptions.width}
                      onChange={(e) =>
                        setQrOptions((prev) => ({
                          ...prev,
                          width: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                    <span className="text-sm text-gray-700">
                      {qrOptions.width}px
                    </span>
                  </div>

                  {/* Error Correction */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Error Correction
                    </label>
                    <select
                      value={qrOptions.errorCorrectionLevel}
                      onChange={(e) =>
                        setQrOptions((prev) => ({
                          ...prev,
                          errorCorrectionLevel: e.target.value as
                            | "L"
                            | "M"
                            | "Q"
                            | "H",
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      QR Code Color
                    </label>
                    <input
                      type="color"
                      value={customColors.dark}
                      onChange={(e) =>
                        setCustomColors((prev) => ({
                          ...prev,
                          dark: e.target.value,
                        }))
                      }
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={customColors.light}
                      onChange={(e) =>
                        setCustomColors((prev) => ({
                          ...prev,
                          light: e.target.value,
                        }))
                      }
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* QR Code Display */}
          {qrCodeDataUrl && (
            <div className="bg-white rounded-lg shadow-lg p-8 border">
              <div className="flex flex-col items-center">
                {/* QR Code with frame effect */}
                <div className="bg-white p-4 rounded-lg shadow-inner border-2 border-gray-200 mb-6">
                  <img
                    src={qrCodeDataUrl}
                    alt="Generated QR Code"
                    className="w-64 h-64"
                    style={{
                      width: `${Math.min(256, qrOptions.width)}px`,
                      height: `${Math.min(256, qrOptions.width)}px`,
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="w-full max-w-sm space-y-4">
                  <div className="flex gap-3">
                    <button
                      onClick={downloadQRCode}
                      className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Copy URL to clipboard"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>

                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  >
                    <option value="PNG">PNG</option>
                    <option value="JPEG">JPEG</option>
                    <option value="JPG">JPG</option>
                    <option value="SVG">SVG</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder when no QR code */}
          {!qrCodeDataUrl && (
            <div className="bg-white rounded-lg shadow-lg p-8 border">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-200 mb-6">
                  <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600 text-center">
                      Your QR code will appear here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
