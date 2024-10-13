var messageTextarea = document.getElementById("message");
var charCountElement = document.getElementById("charCount");

messageTextarea.addEventListener("input", function () {
  var charCount = messageTextarea.value.length;
  var maxChars = messageTextarea.getAttribute("maxlength");

  charCountElement.textContent = charCount + "/" + maxChars;

  if (charCount >= maxChars) {
    messageTextarea.classList.add("error");
    charCountElement.classList.add("text-danger");
  } else {
    messageTextarea.classList.remove("error");
    charCountElement.classList.remove("text-danger");
  }
});
