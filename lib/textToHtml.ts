const textToHtml = (text: string) => {
  const newText =
    "<p>" + text.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>") + "</p>";
  return newText;
};

export default textToHtml;
