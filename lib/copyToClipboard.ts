const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert("Text Copied to Clipboard");
};

export default copyToClipboard;
